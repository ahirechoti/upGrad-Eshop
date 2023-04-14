const authentication = require('../middlewares/auth');
const productController = require('../controllers/product.controller');

const saveProduct = (app) => {
    app.post('/products', [authentication.verifyToken, authentication.verifyAdminAuth], productController.addProduct);
}

const productRoute = {
    saveProduct
}
module.exports = productRoute;