// authentication
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
};
module.exports = {
    userIsAuth,
    userIsNotAuth,
};
