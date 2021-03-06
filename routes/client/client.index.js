const express = require('express');
const router = express.Router();

const {
    userRegister,
    registerMethod,
    home,
} = require('../../app/Client/Auth/clientAuthController/client.controller');
const {
    userIsAuth,
    userIsNotAuth,
} = require('../../app/Client/Auth/clientAuthMiddleware/client.middleware');
const {
    IsUser,
} = require('../../app/Client/Auth/clientAuthMiddleware/AuthzationMiddleware');
const {
    Product,
    pageProduct,
    getProductType,
    setProductType,
    createProduct,
    setProduct,
    getUploadImage,
    // uploadImg,
    getBuyProduct,
    setBuyProduct,
    showCardAType,
} = require('../../app/Client/product/product');
const {
    uploadImg,
    uploadImgs
} = require('../../app/Client/product/uploadImg');


router.route('/register')
    .get(userIsAuth, userRegister)
    .post(userIsAuth, registerMethod);
router.route('/')
    .get(userIsNotAuth, IsUser, home);
router.route('/client_product')
    .get(userIsNotAuth, Product);
router.route('/create_productType')
    .get(userIsNotAuth, getProductType)
    .post(userIsNotAuth, setProductType);
router.route('/create_product/:product_type_slug')
    .get(userIsNotAuth, IsUser, createProduct);
router.route('/create_product')
    .post(userIsNotAuth, setProduct);
router.route('/upload_image/:product_type_id/:product_type_slug')
    .get(userIsNotAuth, getUploadImage)
    .post(userIsNotAuth, uploadImg);
router.route('/product')
    .get(userIsNotAuth, pageProduct);
router.route('/Buy_product/:product_id/:product_slug')
    .get(userIsNotAuth, getBuyProduct)
    .post(userIsNotAuth, setBuyProduct);
router.route('/product/:product_type_id/:product_type_slug')
    .get(userIsNotAuth, IsUser, showCardAType);
router.route('/uploadImages')
    .post(userIsNotAuth, uploadImgs);
module.exports = router;
