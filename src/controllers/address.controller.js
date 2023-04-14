const addressModel = require('../models/eshop-shipping-address.model');
const httpStatus = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');
const eshopUserModel = require('../models/eshop-user.model');

const secret = process.env.SECRET || "TEST";

const addAddress = async (req, res) => {
    try {
        const addressObj = {
            "name": req.body.name,
            "contactNumber": req.body.contactNumber,
            "street": req.body.street,
            "landmark": req.body.landmark,
            "city": req.body.city,
            "state": req.body.state,
            "zipcode": req.body.zipcode
        }
        //console.log(req.headers, req.header);
        if (!addressObj.name || !addressObj.contactNumber ||
            !addressObj.street || !addressObj.landmark || !addressObj.city
            || !addressObj.state || !addressObj.zipcode) {
            return res.status(httpStatus.BAD_REQUEST).json('Bad request');
        }
        if (!req.headers['x-auth-token']) {
            return res.status(httpStatus.UNAUTHORIZED).json('Please login first to access this endpoint!');
        }
        const token = req.headers['x-auth-token'];
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(httpStatus.UNAUTHORIZED).json('Please login first to access this endpoint!');
            }
            addressObj['user_id'] = decoded._id;
            const address = await addressModel(addressObj);
            address.save().then(async () => {
                const user = await eshopUserModel.findOne({ '_id': decoded._id });

                const result = {
                    "_id": address._id,
                    "name": address.name,
                    "contactNumber": address.contactNumber,
                    "street": address.street,
                    "landmark": address.landmark,
                    "city": address.city,
                    "state": address.state,
                    "zipcode": address.zipcode,
                    "createdAt": address.created_date,
                    "updatedAt": address.modified_date,
                    "user": {
                        "_id": user._id,
                        "password": user.password,
                        "firstName": user.first_name,
                        "lastName": user.last_name,
                        "email": user.email,
                        "contactNumber": user.contactNumber,
                        "role": user.role,
                        "createdAt": user.created_date,
                        "updatedAt": user.modified_date
                    }
                }
                return res.status(httpStatus.OK).json(result);
            }).catch(err => {
                if (err.name == 'ValidationError') {
                    let errorMessage = err;
                    if(err.errors.zipcode){
                        errorMessage = err.errors.zipcode.message;
                    }else if(err.errors.contactNumber){
                        errorMessage = err.errors.contactNumber.message;
                    }
                    
                    console.error('Validation failed:', errorMessage);
                    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorMessage);
                }
            });

        });
    } catch (error) {
        console.error(error.errors.zipcode);
        let msg = error.errors;
        if (error.errors.zipcode) {
            msg = error.errors.zipcode.message;
        } else if (error.errors.contactNumber) {
            msg = error.errors.contactNumber.message;
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(msg);
    }
}

const shippingController = {
    addAddress
}
module.exports = shippingController;