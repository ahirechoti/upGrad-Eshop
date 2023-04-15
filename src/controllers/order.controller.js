const orderModel = require('../models/eshop-order.model');
const eshopProductModel = require('../models/eshop-product.model');
const eshopShippingAddressModel = require('../models/eshop-shipping-address.model');
const eshopUserModel = require('../models/eshop-user.model');
const httpStatus = require('http-status-codes').StatusCodes;

const createOrder = async (req, res) => {
    try {
        if(!req.body.addressId || !req.body.productId || !req.body.quantity){
            return res.status(httpStatus.BAD_REQUEST).json('Bad request');
        }
        //get address.
        const address = await eshopShippingAddressModel.findOne({'_id': req.body.addressId}) || null;
        if(!address){
            return res.status(httpStatus.NOT_FOUND).json(`No Address found for ${req.body.addressId} - <id>!`);
        }
        const clientUser = await eshopUserModel.findOne({'_id': address.user_id[0]}) || null;
        
        //get product.
        const product = await eshopProductModel.findOne({'_id': req.body.productId}) || null;
        if(!product){
            return res.status(httpStatus.NOT_FOUND).json(`No Product found for ID - ${req.body.productId}!`);
        }
        if(product.availableItems < req.body.quantity){
            return res.status(httpStatus.OK).json(`Product with ID - ${req.body.productId} is currently out of stock!`);
        }
        //add order.
        const orderObj = {
            amount: (parseInt(req.body.quantity) * product.price),
            orderDate: Date.now(),
            productId: product,
            addressId: address,
            userId: clientUser
        }
        const order = await orderModel(orderObj);
        await order.save();
        //decrease available Items in product.
        product.availableItems = product.availableItems - req.body.quantity;
        await product.save();
       // address.user_id = clientUser;
        let result = {
            "id": order._id,
            "user": clientUser,
            "product": product,
            "shippingAddress": address,
            "amount": order.amount,
            "orderDate": order.orderDate
        }
        result.shippingAddress['user'] = clientUser;
        return res.status(httpStatus.OK).json(result);
    } catch (error) {
        console.error('Internal server error', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Internal server error');
    }
}

const orderController = {
    createOrder
}
module.exports = orderController;