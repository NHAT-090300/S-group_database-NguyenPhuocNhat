const knex = require('../../knex/knex');
const bcrypt = require('bcrypt');
const {
    check,
    validationResult
} = require('express-validator');
const saltRounds = 10;
// register
const registerMethod = async (req, res) => {
    check('username').isEmail(),
    check('password').isLength({ min: 6 });
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.redirect('/resgister')
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
const loginMethod = async (req, res) => {
    const user = await knex('users').where({
            email: req.body.email,
        })
        .first();
    console.log(user);
    if (typeof user !== 'undefined') {
        const match = await bcrypt.compare(req.body.password, user.password);
        console.log(match)
        if (match) {
            req.session.user = user;
            return res.redirect('/');
        } else {
            return res.redirect('/login');
        };
    } else {
        return res.redirect('/login');
    };
};
//update
const selectUpdate = async (req, res) => {
    let id = req.params.id;
    await knex('users').whereRaw('id = ?', id)
        .then((result) => {
            res.render('pages/user', {
                user: result[0]
            })
        })
        .catch((err) => {
            if (err) throw err;
        })
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
//delete
const Delete = async (req, res) => {
    await knex("users").where({
        id: req.params.id
    }).delete();
    return res.redirect('/table');
}

// home
const renderHomepage = (req, res) => {
    res.locals = {
        title: 'Administrator Board',
    };
    return res.render('pages/dashboard');
};
//logout
const logOut = (req, res) => {
    req.session.destroy();
    res.redirect('/login')
}
//authentication
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