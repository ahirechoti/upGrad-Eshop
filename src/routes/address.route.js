const addressController = require('../controllers/address.controller');

const addAddress = (app) => {
    app.post('/addresses', addressController.addAddress);
}
const addressRoute = { addAddress };
module.exports = addressRoute;