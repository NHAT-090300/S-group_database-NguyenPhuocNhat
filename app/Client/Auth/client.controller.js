const knex = require('../../../knex/knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {
    check,
    validationResult,
} = require('express-validator');

const userRegister = (req, res) => {
    return res.render('pages/client/clientRegister', {
        layout: false,
    });
};

// register
const registerMethod = async (req, res) => {
    check('username').isEmail();
    check('password').isLength({ min: 6 });
    let errors = validationResult(req);
    if (!errors.isEmpty() || req.body.password !== req.body.password2) {
        res.redirect('/register');
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        await knex('users').insert({
            email: req.body.email,
            fullname: req.body.fullname,
            username: req.body.username,
            password: hashedPassword,
        });
        await knex('role').insert({
            admin: req.body.admin,
        });
        if (req.body.password !== req.body.password2) {
            return res.redirect('/register');
        } else {
            return res.redirect('/login');
        }
    }
};

const home = (req, res) => {
    return res.render('pages/client/clientDashboad', { layout: false });
};

module.exports = {
    userRegister,
    registerMethod,
    home,
};
