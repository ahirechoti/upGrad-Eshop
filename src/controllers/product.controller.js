const productModel = require('../models/eshop-product.model');
const httpStatus = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');
const eshopUserModel = require('../models/eshop-user.model');
const secret = process.env.SECERET || 'TEST';

const fetchAllProducts = async (req, res) => {
    try {
        const queryParam = {};
        if(req.query.category){
            queryParam['category'] = req.query.category;
        }
        if(req.query.name){
            queryParam['name'] = req.query.name;
        }
        const sortingParam = {};
        if(req.query.sortBy){
            sortingParam[req.query.sortBy] = (req.query.direction) ? (req.query.direction == 'ASC' ? 1 : -1 ) : -1;
        }else{
            sortingParam['productId'] = (req.query.direction) ? (req.query.direction == 'ASC' ? 1 : -1 ) : -1;
        }
        console.log(queryParam, sortingParam);
        const products = await productModel.find(queryParam).sort(sortingParam);
        return res.status(httpStatus.OK).json(products);
    } catch (error) {
        console.error('Internal server error', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Internal server error');
    }
}

const addProduct = async (req, res) => {
    try {
        const productObj = {
            "name": req.body.name,
            "category": req.body.category,
            "price": req.body.price,
            "description": req.body.description,
            "manufacturer": req.body.manufacturer,
            "availableItems": req.body.availableItems,
            "imageUrl": req.body.imageUrl
        }
        
        const product = await productModel(productObj);
        await product.save();
        return res.status(httpStatus.OK).json(product);
    } catch (error) {
        console.error('Internal server error', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Internal server error');
    }
}

const productController = {
    fetchAllProducts,
    addProduct
}
module.exports = productController;