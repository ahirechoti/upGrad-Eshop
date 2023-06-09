const jwt = require('jsonwebtoken');
const eshopUserModel = require('../models/eshop-user.model');
const httpStatus = require('http-status-codes').StatusCodes;

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['x-auth-token'];
        if(!token){
            return res.status(httpStatus.NOT_ACCEPTABLE).json('Please login first to access this endpoint!')
        }
        jwt.verify(token, (process.env.SECRET || 'TEST'), async (err, data)=>{
            if(err){
                return res.status(httpStatus.UNAUTHORIZED).json('Please login first to access this endpoint!');
            }
            req.jwtDecoded = data;
            if(!req.currentUser){
                const user = await eshopUserModel.findOne({'_id': data._id});
                req.currentUser = user;
            }
            //req.currentUser = data.user;
            next();
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const verifyAdminAuth = (req, res, next) => {
    try {
        if(req.currentUser && req.currentUser.role.toLowerCase() == 'admin'){
            next();
        }else{
            res.status(httpStatus.UNAUTHORIZED).json('You are not authorised to access this endpoint!')
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const verifyUserAuth = async (req, res, next) => {
try {
    if(req.currentUser && req.currentUser.role.toLowerCase() == 'user'){
        next();
    }else{
        res.status(httpStatus.UNAUTHORIZED).json('You are not authorised to access this endpoint!')
    }
} catch (error) {
    console.error(error);
    next(error);
}
}
const authentication =  {verifyToken, verifyAdminAuth, verifyUserAuth};
module.exports = authentication;