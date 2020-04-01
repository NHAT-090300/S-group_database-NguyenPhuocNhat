const knex = require('../../knex/knex');
const renderTable = async(req, res) =>{
    await knex('users').select('*')
    .then((result) =>{
        return res.render('pages/tables',{data: result});
    })
    .carth((err) =>{
        if(err) throw err;
    })
}
const renderLogin = (req, res) => {
    res.render('pages/login', { layout: false });
};
const renderRegister = (req, res) => {
    res.render('pages/register', { layout: false });
};
const renderProList = (req, res) => {
    res.render('pages/productList');
}
const renderUser = (req, res) => {
    res.render('pages/user');
};
const renderDashboard = (req, res) => {
    res.render('pages/dashboard');
};
const renderIcon = (req, res) => {
    res.render('pages/icons');
};

const renderMap = (req, res) => {
    res.render('pages/maps');
};
const renderNotificastion = (req, res) => {
    res.render('pages/notifications');
};
const renderTypography = (req, res) => {
    res.render('pages/typography');
};
const renderUpgrade = (req, res) => {
    res.render('pages/upgrade');
};
const renderRtl = (req, res) => {
    res.render('pages/rtl');
};
module.exports = {
    renderTable,
    renderLogin,
    renderRegister,
    renderUser,
    renderDashboard,
    renderIcon,
    renderMap,
    renderNotificastion,
    renderTypography,
    renderUpgrade,
    renderRtl,
    renderProList
};