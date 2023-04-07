const userModel = require('../models/eshop-user.model');
const userObject = require('../utils/utils');


const eshopUserModel = require('../models/eshop-user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    try {
        const userObj = {
            id: req.body.id,
            user_name: req.body.user_name,
            email: req.body.email,
            firt_name: req.body.firt_name,
            last_name: req.body.last_name,
            password: req.body.password,
            phone_number: req.body.phone_number,
            role: req.body.role
        }
        //validate.
        if (!userObj.id || !userObj.email || !userObj.firt_name || !userObj.last_name
            || !userObj.password || !userObj.role) {
            return res.status(400).send({
                message: 'Bad response'
            })
        }
        //hash User password.
        userObj.password = bcrypt.hashSync(userObj.password, 10);
        const user = await userModel(userObj);
        await user.save();
        res.status(200).send(userObject(user));

    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Internal server error'
        })
    }
}
const signIn = async (req, res) => {
    try {
        if(!req.body.password){
            return res.status(400).send({
                message: "Please provide password."
            })
        }
        const queryParam = {};
        if(req.body.email){
            queryParam['email'] = req.body.email
        }else if(req.body.id){
            queryParam['id'] = req.body.id
        }else{
            return res.status(400).send({
                message: "Please provide email/id"
            })
        }

        const user = await userModel.findOne(queryParam);
        if(!user){
            return res.status(400).send({
                message: "User does not exists"
            })
        }
        if(bcrypt.compareSync(req.body.password, user.password)){
            //jwt token create and pass.
            const token = jwt.sign({user:user}, process.env.SECRET,{
                expiresIn: 5000
            });
            res.status(200).send({
                message: "Login success.",
                token: token
            })
        }else{
            res.status(400).send({
                message: "Inorrect password"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Internal server error'
        })
    }
}

module.exports =  { signUp, signIn }