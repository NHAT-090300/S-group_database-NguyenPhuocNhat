let express = require('express');
let router = express.Router();

const {
    userRegister,
    registerMethod,
    home,
} = require('../../app/Client/Auth/client.controller');
const {
    userIsAuth,
    userIsNotAuth,
} = require('../../app/Client/Auth/client.middleware');
const {
    Product,
    pageProduct,
    getProductType,
    setProductType,
    createProduct,
    setProduct,
    getUploadImage,
    uploadImg,
} = require('../../app/Client/product/product');


router.route('/register')
    .get(userIsAuth, userRegister)
    .post(userIsAuth, registerMethod);
router.route('/')
    .get(userIsNotAuth, home);
router.route('/client_product')
    .get(userIsNotAuth, Product);
router.route('/create_productType')
    .get(userIsNotAuth, getProductType)
    .post(userIsNotAuth, setProductType);
router.route('/create_product')
    .get(userIsNotAuth, createProduct)
    .post(userIsNotAuth, setProduct);
router.route('/upload_image/:product_type_id')
    .get(userIsNotAuth, getUploadImage)
    .post(userIsNotAuth, uploadImg);
router.route('/product')
    .get(userIsNotAuth, pageProduct);

module.exports = router;