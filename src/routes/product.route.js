const authentication = require('../middlewares/auth');
const productController = require('../controllers/product.controller');

const saveProduct = (app) => {
    app.post('/products', [authentication.verifyToken, authentication.verifyAdminAuth], productController.addProduct);
}
const getAllProducts = (app) => {
    app.get('/products', productController.fetchAllProducts);
}
const getProductCategories = (app) => {
    app.get('/products/categories', productController.getProductCategories);
}
const getProductbyID = (app) => {
    app.get('/products/:id', productController.getProductbyID);
}
const productRoute = {
    saveProduct,
    getAllProducts,
    getProductCategories,
    getProductbyID
}
module.exports = productRoute;