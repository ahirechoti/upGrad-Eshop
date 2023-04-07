const jwt = require('jsonwebtoken');
const userModel = require('../models/eshop-user.model');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).send({
                message: "Token required."
            })
        }
        const isValidToken = await jwt.verify(token, process.env.SECRET);
        if(!isValidToken){
            res.status(403).send({
                message: "Invalid token"
            })
        }else{
            next();
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const verifyAdminAuth = (req, res, next) => {
    try {
        
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const verifyUserAuth = (req, res, next) => {
    try {
        
    } catch (error) {
        console.error(error);
        next(error);
    }
}
module.exports =  {verifyToken, verifyAdminAuth, verifyUserAuth}