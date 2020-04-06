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
} = require('../app/Product/product.controller');
const { 
  proTypePost,
  productPost,
  proTypeDelete,
  showProduct
} = require('../app/Product/product.middleware');
router.get('/logOut',logOut);
router.get('/register',userIsAuth,renderRegister);
router.post('/register',userIsAuth,registerMethod);
router.get('/login',userIsAuth,renderLogin);
router.post('/login',userIsAuth,loginMethod);
router.get('/user',userIsNotAuth,renderUser);
router.get('/',userIsNotAuth,renderHomepage);
router.get('/icons',userIsNotAuth,renderIcon);
router.get('/table',userIsNotAuth,renderTable);
router.get('/map',userIsNotAuth,renderMap);
router.get('/notifications',userIsNotAuth,renderNotificastion);
router.get('/typography',userIsNotAuth,renderTypography);
router.get('/upgrade',userIsNotAuth,renderUpgrade);
router.get('/rtl',userIsNotAuth,renderRtl);
router.get('/table/:id',userIsNotAuth,Delete);
router.get('/user/:id',userIsNotAuth,selectUpdate)
router.put('/update/:id',userIsNotAuth,update);
//
router.get('/product',userIsNotAuth,renderProductList);
router.get('/product/createType',userIsNotAuth, renderProductType);
router.post('/product/createType',userIsNotAuth, proTypePost);
router.get('/product/show_product_type/:product_type_id',userIsNotAuth,showProduct);

router.get('/product/deleteProductType/:product_type_id',userIsNotAuth,proTypeDelete );
router.get('/product/createProduct',userIsNotAuth, renderProduct);
router.post('/product/createProduct',userIsNotAuth, productPost);


module.exports = router;
