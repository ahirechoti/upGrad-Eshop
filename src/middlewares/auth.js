const jwt = require('jsonwebtoken');
const userModel = require('../models/eshop-user.model');
const eshopUserModel = require('../models/eshop-user.model');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).send({
                message: "Token required."
            })
        }
        jwt.verify(token, process.env.SECRET, (err, data)=>{
            if(err){
                return res.status(401).send({
                    message: 'Unauthorized'
                });
            }
            req.currentUser = data.user;
            next();
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const verifyAdminAuth = (req, res, next) => {
    try {
        if(req.currentUser.role == 'ADMIN'){
            next();
        }else{
            res.status(403).send('You are not admin.')
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const checkIsSameUserorAdmin = async (req, res, next) => {
try {
    const id = req.body.id || req.query.id;
    //console.log(req.currentUser)
    if(req.currentUser.role == 'ADMIN'){
        return next();
    }else if(req.currentUser.id == id){
        next();
    }else{
        res.status(403).send('You are not owner.')
    }
} catch (error) {
    console.error(error);
    next(error);
}
}
module.exports =  {verifyToken, verifyAdminAuth, checkIsSameUserorAdmin}