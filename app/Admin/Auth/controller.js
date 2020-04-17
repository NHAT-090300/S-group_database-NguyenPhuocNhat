const knex = require('../../../knex/knex');
const bcrypt = require('bcrypt');
const {
    check,
    validationResult
} = require('express-validator');
const saltRounds = 10;

const renderLogin = (req, res) => {
    res.render('pages/login', {
        layout: false
    });
};

const renderRegister = (req, res) => {
    res.render('pages/register', {
        layout: false
    });
};

// register
const registerMethod = async (req, res) => {
    check('username').isEmail(),
    check('password').isLength({ min: 6 });
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.redirect('/admin/resgister')
    } else {
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

//login
// phần này em lấy admin trong bảng users nếu bằng 0 là admin nếu bằng 1 là user.
const loginMethod = async (req, res) => {
    const user = await knex('users').where({
            email: req.body.email,
        }).first();
    console.log(user);
    // dùng bcrypt để xác thực có đúng mk hay ko
    if (typeof user !== 'undefined') {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            // phần này hơi rối. em dùng for in để để lấy giá trị trong checkUser.
            let checkUser = await knex('users').where({
                email: req.body.email,
            }).select('admin');
            for(var i of checkUser) {
                if ( i.admin == 0) {
                    req.session.user = user;
                    return res.redirect('/admin');
                } else {
                    req.session.user = user;
                    return res.redirect('/');
                }
            }
        } else {
            return res.redirect('/login');
        }
    } else {
        return res.redirect('/login');
    }
};

//logout
const logOut = (req, res) => {
    req.session.destroy();
    res.redirect('/login')
}

module.exports = {
    registerMethod,
    loginMethod,
    logOut,
    renderLogin,
    renderRegister,

};