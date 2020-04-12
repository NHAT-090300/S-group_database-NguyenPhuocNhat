var express = require('express');
var router = express.Router();

const {
    renderRegister,
    renderLogin,
    renderUser,
    renderIcon,
    renderTable,
    renderMap,
    renderNotificastion,
    renderTypography,
    renderUpgrade,
    renderRtl
} = require('../app/User/user.controller');
const {
    registerMethod,
    loginMethod,
    logOut,
    userIsAuth,
    userIsNotAuth,
    renderHomepage,
    Delete,
    update,
    selectUpdate
} = require('../app/Admin/controller')
const {
    renderProductType,
    renderProduct,
    renderProductList,
    proTypePost,
    productPost,
    proTypeDelete,
    showProduct,
    getProductId,
    deleteProduct
} = require('../app/Product/product.controller');
const {
    uploadImg,
    PagesProduct
    // getProduct_Img
} = require('../app/product/upload.contronler')
// Admin and users
router.get('/logOut', logOut);
router.get('/register', userIsAuth, renderRegister);
router.post('/register', userIsAuth, registerMethod);
router.get('/login', userIsAuth, renderLogin);
router.post('/login', userIsAuth, loginMethod);
router.get('/user', userIsNotAuth, renderUser);
router.get('/', userIsNotAuth, renderHomepage);
router.get('/icons', userIsNotAuth, renderIcon);
router.get('/table', userIsNotAuth, renderTable);
router.get('/map', userIsNotAuth, renderMap);
router.get('/notifications', userIsNotAuth, renderNotificastion);
router.get('/typography', userIsNotAuth, renderTypography);
router.get('/upgrade', userIsNotAuth, renderUpgrade);
router.get('/rtl', userIsNotAuth, renderRtl);
router.get('/table/:id', userIsNotAuth, Delete);
router.get('/user/:id', userIsNotAuth, selectUpdate)
router.put('/update/:id', userIsNotAuth, update);
//products
router.get('/product', userIsNotAuth, renderProductList);
router.route('/product/createType')
    .get(userIsNotAuth, renderProductType)
    .post(userIsNotAuth, proTypePost);

router.get('/product/show_product_type/:product_type_id', userIsNotAuth, showProduct);
router.delete('/product/deleteProductType/:product_type_id', userIsNotAuth, proTypeDelete);

router.get('/product/createProduct/:product_type_id', userIsNotAuth, renderProduct);
router.post('/product/createProduct', userIsNotAuth, productPost);

router.get('/product/upload/render_pages_product', userIsNotAuth, PagesProduct);
router.post('/product/upload/:product_id', userIsNotAuth, uploadImg);

router.get('/get_product/:product_id', userIsNotAuth, getProductId);
router.delete('/delete_product/:product_id', userIsNotAuth, deleteProduct)
module.exports = router;