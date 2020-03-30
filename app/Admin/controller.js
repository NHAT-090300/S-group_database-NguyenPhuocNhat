const knex = require('../../knex/knex');
var mysql      = require('mysql');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const hash = bcrypt.hashSync(myPlaintextPassword, salt);
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'db'
});

// const registerMethod = async (req, res) => {
//     const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
//     await knex('users').insert({
//       email: req.body.email,
//       fullname: req.body.fullname,
//       username: req.body.username,
//       password: hashedPassword,
//     });
//     return res.redirect('/login');
// };
const registerMethod = async (req, res) => {
  check('username').isEmail(),
  check('password').isLength({ min: 6 })
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.redirect('/resgister')
  }else {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    await knex('users').insert({
      email: req.body.email,
      fullname: req.body.fullname,
      username: req.body.username,
      password: hashedPassword,
    });
    return res.redirect('/login');
  }
};
const loginMethod = async (req, res) => {
  const compasre = bcrypt.compareSync(req.body.password, hash)
  const hasUser = await knex('users').where({
    email: req.body.email,
    password: compasre,
  }).first();
  if (typeof hasUser === 'undefined') {
    return res.redirect('/login');
  }
  req.session.user = hasUser;
  return res.redirect('/');
};

const selectUpdate = async (req, res)=>{
  const id = req.params.id;
  await connection.query('SELECT * FROM users WHERE id = ?',[id], function (err, result) {
    if (err) throw err;
    res.render('pages/user',{
      user : result[0]
    })
  });
};

const update = async (req, res) => {
  await knex('users').where({
    id: req.params.id,
  }).update({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
  });
  return res.redirect('/table');
};
const renderHomepage = (req, res) => {
  res.locals = {
    title: 'Administrator Board',
  };
  return res.render('pages/dashboard');
};
const logOut = (req, res) => {
  req.session.destroy();
  res.redirect('/login')
}
const userIsAuth = (req, res, next) => {
  if (typeof req.session.user !== 'undefined') {
    return res.redirect('/');
  }
  return next();
};
const userIsNotAuth = (req, res, next) => {
  if (typeof req.session.user !== 'undefined') {
    return next();
  }
  return res.redirect('/login');
}
const Delete = async (req, res) => {
  await knex("users").where({id: req.params.id}).delete();
  return res.redirect('/table');
}
module.exports = {
  registerMethod,
  loginMethod,
  userIsAuth,
  userIsNotAuth,
  renderHomepage,
  logOut,
  Delete,
  update,
  selectUpdate
};
