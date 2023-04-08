const { fecthUsers, updateUser, deleteUsers } = require('../controllers/user.controller');
const {verifyToken, verifyAdminAuth, checkIsSameUserorAdmin} = require('../middlewares/auth');

const getAllUsers = (app) => {
    app.get('/eshop/api/v1/getAllUsers', [verifyToken, checkIsSameUserorAdmin], fecthUsers);
}
const updateUserdetails = (app) => {
    app.post('/eshop/api/v1/updateUser', [verifyToken, verifyAdminAuth], updateUser);
}
module.exports = { getAllUsers, updateUserdetails }