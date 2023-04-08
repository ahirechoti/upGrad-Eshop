const eshopUserModel = require('../models/eshop-user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userObject = require('../utils/utils')

const fecthUsers = async (req, res) => {
    try {
        const queryParam = {};
        let user;
        //console.log(req.query, req.query == {});
        if(req.query && Object.keys(req.query).length === 0){
            user = await eshopUserModel.find(queryParam);
            return res.status(200).send(userObject(user));
        }
        if(!req.query.id || !req.query.role || !req.query.name || !req.query.email){
            return res.status(400).send({
                message: 'Invalid search query.'
            })
        }
        if(req.query.id){
            queryParam['id'] = req.query.id;
        }else if(req.query.email){
            queryParam['email'] = req.query.email;
        }
        if(!queryParam.id || !queryParam.email){
            if(req.query.name){
                queryParam['name'] = req.query.name;
            }
            if(req.query.role){
                queryParam['role'] = req.query.role;
            }
        }
        
        user = await eshopUserModel.find(queryParam);
        res.status(200).send(userObject(user));
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const updateUser = (req, res) => {
    try {
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const deleteUsers = (req, res) => {
    try {
        
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

module.exports = { fecthUsers, updateUser, deleteUsers }