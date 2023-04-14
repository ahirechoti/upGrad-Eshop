const userModel = require('../models/eshop-user.model');
const userObject = require('../utils/utils');
const httpStatus = require('http-status-codes').StatusCodes;

const eshopUserModel = require('../models/eshop-user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    try {
        const userObj = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            contactNumber: req.body.contactNumber
        }
        //validate.
        if (!userObj.email || !userObj.first_name || !userObj.last_name
            || !userObj.password || !userObj.contactNumber) {
            return res.status(httpStatus.BAD_REQUEST).send({
                message: 'Bad response'
            })
        }
        //hash User password.
        userObj.password = bcrypt.hashSync(userObj.password, 10);
        const user = await userModel(userObj);
        await user.save();
        res.status(httpStatus.OK).json(userObject(user)[0]);

    } catch (error) {
        console.error(error);
        let msg = error;
        if(error.errors.email){
            msg = error.errors.email.message;
        }else if(error.errors.contactNumber){
            msg = error.errors.contactNumber.message;
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(msg);
    }
}
const signIn = async (req, res) => {
    try {
        if(!req.body.password){
            return res.status(httpStatus.BAD_REQUEST).send({
                message: "Please provide password."
            })
        }
        const queryParam = {};
        if(req.body.email){
            queryParam['email'] = req.body.email
        }else{
            return res.status(httpStatus.BAD_REQUEST).send({
                message: "Please provide email/id"
            })
        }

        const user = await userModel.findOne(queryParam);
        if(!user){
            return res.status(httpStatus.OK).json({
                message: "This email has not been registered!"
            })
        }
        if(bcrypt.compareSync(req.body.password, user.password)){
            //jwt token create and pass.
            let jwtdata = {
                "_id": user._id,
                "name": (user.first_name+ " "+user.last_name),
                "isAdmin": (user.role.toLowerCase() == 'admin')
            }
            const token = jwt.sign(jwtdata, (process.env.SECRET || 'TEST'),{
                expiresIn: 5000
            });
            res.header('x-auth-token', token);
            res.status(httpStatus.OK).json({
                "email": user.email,
                "name": (user.first_name+ " "+user.last_name),
                "isAuthenticated": (user.role.toLowerCase() == "admin")
            })
        }else{
            res.status(httpStatus.OK).send({
                message: "Invalid Credentials!"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            message: 'Internal server error'
        })
    }
}

const authCntroller =  { signUp, signIn };
module.exports = authCntroller;