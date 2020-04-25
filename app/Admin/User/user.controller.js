const knex = require('../../../knex/knex');
const renderTable = async (req, res) => {
    await knex('users').select('*')
        .then((result) => {
            return res.render('pages/tables', {
                data: result,
                success: req.flash('success'),
            });
        });
};
const renderUser = (req, res) => {
    res.render('pages/user');
};
const renderDashboard = (req, res) => {
    res.render('pages/dashboard');
};
const renderIcon = (req, res) => {
    res.render('pages/icons');
};
// update
const selectUpdate = async (req, res) => {
    let id = req.params.id;
    knex('users').whereRaw('id = ?', id)
        .then((result) => {
            res.render('pages/user', {
                user: result[0],
            });
        })
        .catch((err) => {
            if (err) throw err;
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
    req.flash('success', {
        msg: 'Update successful',
    });
    return res.redirect('/admin/table');
};
// delete
const Delete = async (req, res) => {
    await knex('users').where({
        id: req.params.id,
    }).delete();
    req.flash('success', {
        msg: 'user has been deleted',
    });
    return res.redirect('/admin/table');
};

// home
const renderHomepage = (req, res) => {
    res.locals = {
        title: 'Administrator Board',
    };
    return res.render('pages/dashboard');
};

module.exports = {
    renderTable,
    renderUser,
    renderDashboard,
    renderIcon,
    renderHomepage,
    Delete,
    update,
    selectUpdate,
};
