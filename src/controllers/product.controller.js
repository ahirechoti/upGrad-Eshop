const productModel = require('../models/eshop-product.model');
const httpStatus = require('http-status-codes').StatusCodes;

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

const getProductCategories = async (req, res) => {
    try {
        const cats = await productModel.find().select('category -_id');
        let result = [];
        if(cats){
            cats.forEach(c => {
                result.push(c.category);
            })
        }
        return res.status(httpStatus.OK).json(result);
    } catch (error) {
        console.error('Internal server error', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Internal server error');
    }
}

const getProductbyID = async (req, res) => {
    try {
        if(!req.params.id){
            return res.status(httpStatus.BAD_REQUEST).json('Bad request');
        }
        const queryParam = {
            '_id': req.params.id
        }
        const product = await productModel.findOne(queryParam);
        if(!product){
            return res.status(httpStatus.NOT_FOUND).json(`No Product found for ID - ${req.params.id}!`)
        }
        return res.status(httpStatus.OK).json(product);
    } catch (error) {
        console.error('Internal server error', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Internal server error');
    }
}

const updateProduct = async (req, res) => {
    try {
        if(!req.params.id){
            return res.status(httpStatus.BAD_REQUEST).json('Bad request');
        }
        const product = await productModel.findOne({'_id': req.params.id});
        if(!product){
            return res.status(httpStatus.NOT_FOUND).json(`No Product found for ID - ${req.params.id}!`)
        }
        product.name = req.body.name || product.name;
        product.category = req.body.category || product.category;
        product.price = req.body.price || product.price;
        product.description = req.body.description || product.description;
        product.manufacturer = req.body.manufacturer || product.manufacturer;
        product.availableItems = req.body.availableItems || product.availableItems;
        product.modified_date = Date.now();
        await product.save();
        res.status(httpStatus.OK).json(product);
    } catch (error) {
        console.error('Internal server error', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Internal server error');
    }
}

const deleteProduct = async (req, res) => {
    try {
        if(!req.params.id){
            return res.status(httpStatus.BAD_REQUEST).json('Bad request');
        }
        const product = await productModel.findOneAndDelete({'_id': req.params.id}) || null;
        if(!product){
            return res.status(httpStatus.NOT_FOUND).json(`No Product found for ID - ${req.params.id}!`)
        }
        return res.status(httpStatus.OK).json(`Product with ID - ${req.params.id} deleted successfully!`)
    } catch (error) {
        console.error('Internal server error', error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Internal server error');
    }
}

const productController = {
    fetchAllProducts,
    addProduct,
    getProductCategories,
    getProductbyID,
    updateProduct,
    deleteProduct
}
module.exports = productController;