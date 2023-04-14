const authController = require('../controllers/auth.controller');

const signUpAPI = (app) => {
    app.post('/users', authController.signUp);
}

const signInAPI = (app) => {
    app.post('/auth', authController.signIn);
}

const authRoute =  { signInAPI, signUpAPI };
module.exports = authRoute;