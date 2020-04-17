let express = require('express');
let router = express.Router(); 

const {
    userRegister,
    registerMethod,
    home
} = require('../../app/Client/Auth/client.controller');
const {
    userIsAuth,
    userIsNotAuth
} = require('../../app/Client/Auth/client.middleware');
const {
    Product
} =  require('../../app/Client/product/buy.Product');


router.route('/register')
    .get(userIsAuth, userRegister)
    .post(userIsAuth, registerMethod);
router.route('/')
    .get(userIsNotAuth,home );
router.route('/client_product')
    .get(userIsNotAuth, Product);
module.exports = router;