const express = require('express');
const router = express.Router();

const {
    renderUser,
    renderIcon,
    renderTable,
    renderHomepage,
    Delete,
    update,
    selectUpdate,
} = require('../../app/Admin/User/user.controller');
const {
    renderRegister,
    renderLogin,
    registerMethod,
    loginMethod,
    logOut,
} = require('../../app/Admin/Auth/Authcontroller/controller');
const {
    userIsAuth,
    userIsNotAuth,
} = require('../../app/Admin/Auth/AuthMiddleware/middleware');
const {
    renderProductType,
    renderProduct,
    renderProductList,
    proTypePost,
    productPost,
    proTypeDelete,
    showProduct,
    getProductId,
    deleteProduct,
    showCardAType,
} = require('../../app/Admin/Product/product.controller');
const {
    uploadImg,
    PagesProduct,
    uploadImgs
} = require('../../app/Admin/product/upload.contronler');

const {
    IsAdmin,
} = require('../../app/Admin/Auth/AuthMiddleware/AuthzationMiddleware');

// Authentica
router.get('/logOut', logOut);
router.route('/admin/register')
    .get(userIsAuth, renderRegister)
    .post(userIsAuth, registerMethod);
router.route('/login')
    .get(userIsAuth, renderLogin)
    .post(userIsAuth, loginMethod);

// render pages
router.get('/admin', userIsNotAuth, IsAdmin, renderHomepage);
router.get('/admin/user', userIsNotAuth, renderUser);
router.get('/admin/icons', userIsNotAuth, IsAdmin, renderIcon);
router.get('/admin/table', userIsNotAuth, IsAdmin, renderTable);
router.get('/admin/table/:id', userIsNotAuth, Delete);
router.get('/admin/user/:id', userIsNotAuth, selectUpdate);
router.put('/admin/update/:id', userIsNotAuth, update);

// products
router.get('/admin/product', userIsNotAuth, IsAdmin, renderProductList);
router.route('/admin/product/createType')
    .get(userIsNotAuth, IsAdmin, renderProductType)
    .post(userIsNotAuth, proTypePost);

router.get('/admin/product/show_product_type/:product_type_slug', userIsNotAuth, showProduct);
router.delete('/admin/product/deleteProductType/:product_type_slug', userIsNotAuth, proTypeDelete);

router.get('/admin/product/createProduct/:product_type_slug', userIsNotAuth, renderProduct);
router.post('/admin/product/createProduct', userIsNotAuth, productPost);

router.get('/admin/product/upload', userIsNotAuth, PagesProduct);
router.post('/admin/product/upload/:product_id', userIsNotAuth, uploadImg);

router.get('/admin/get_product/:product_id/:product_slug', userIsNotAuth, IsAdmin, getProductId);
router.delete('/admin/delete_product/:product_id', userIsNotAuth, deleteProduct);

router.route('/admin/product/:product_type_id/:product_type_slug')
    .get(userIsNotAuth, IsAdmin, showCardAType);
router.route('/admin/uploadImg')
    .post(userIsNotAuth, uploadImgs);

module.exports = router;
