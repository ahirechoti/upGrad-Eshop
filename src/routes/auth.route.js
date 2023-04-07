const { signUp, signIn } = require('../controllers/auth.controller');

const signUpAPI = (app) => {
    app.post('/eshop/api/v1/signUp', signUp);
}

const signInAPI = (app) => {
    app.post('/eshop/api/v1/signIn', signIn);
}

module.exports =  { signInAPI, signUpAPI };