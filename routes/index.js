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
module.exports = router;
