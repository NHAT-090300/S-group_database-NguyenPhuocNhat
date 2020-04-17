let express = require('express');
let router = express.Router();

const {
    renderUser,
    renderIcon,
    renderTable,
    renderHomepage,
    Delete,
    update,
    selectUpdate
} = require('../../app/Admin/User/user.controller');
const {
    renderRegister,
    renderLogin,
    registerMethod,
    loginMethod,
    logOut
} = require('../../app/Admin/Auth/controller');
const { 
    userIsAuth,
    userIsNotAuth
} = require('../../app/Admin/Auth/middleware');
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
} = require('../../app/Admin/Product/product.controller');
const {
    uploadImg,
    PagesProduct
} = require('../../app/Admin/product/upload.contronler');


// Authentica
router.get('/logOut', logOut);
router.route('/admin/register')
    .get(userIsAuth, renderRegister)
    .post( userIsAuth, registerMethod);
router.route('/login')
    .get(userIsAuth, renderLogin)
    .post(userIsAuth, loginMethod);

// render pages
router.get('/admin', userIsNotAuth, renderHomepage);
router.get('/admin/user', userIsNotAuth, renderUser);
router.get('/admin/icons', userIsNotAuth, renderIcon);
router.get('/admin/table', userIsNotAuth, renderTable);
router.get('/admin/table/:id', userIsNotAuth, Delete);
router.get('/admin/user/:id', userIsNotAuth, selectUpdate)
router.put('/admin/update/:id', userIsNotAuth, update);

//products
router.get('/admin/product', userIsNotAuth, renderProductList);
router.route('/admin/product/createType')
    .get(userIsNotAuth, renderProductType)
    .post(userIsNotAuth, proTypePost);

router.get('/admin/product/show_product_type/:product_type_id', userIsNotAuth, showProduct);
router.delete('/admin/product/deleteProductType/:product_type_id', userIsNotAuth, proTypeDelete);

router.get('/admin/product/createProduct/:product_type_id', userIsNotAuth, renderProduct);
router.post('/admin/product/createProduct', userIsNotAuth, productPost);

router.get('/admin/product/upload', userIsNotAuth, PagesProduct);
router.post('/admin/product/upload/:product_id', userIsNotAuth, uploadImg);

router.get('/admin/get_product/:product_id', userIsNotAuth, getProductId);
router.delete('/admin/delete_product/:product_id', userIsNotAuth, deleteProduct)
module.exports = router;