const IsUser = (req, res, next) => {
    if (req.session.role === 0) {
        console.log(req.session.role);
        next();
    } else {
        return res.redirect('/admin');
    }
};
module.exports = {
    IsUser,
};
