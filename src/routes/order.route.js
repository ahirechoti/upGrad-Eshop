const orderController = require('../controllers/order.controller');
const authentication = require('../middlewares/auth');

const createOrder = (app) => {
    app.post('/orders',[authentication.verifyToken, authentication.verifyUserAuth], orderController.createOrder );
}

const orderRoute = {
    createOrder
}
module.exports = orderRoute;