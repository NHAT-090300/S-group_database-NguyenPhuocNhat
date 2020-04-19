const IsAdmin = (req, res, next) => {
    if (req.session.role === 1) {
        console.log(req.session.role);
        next();
    } else {
        return res.redirect('/');
    }
};
module.exports = {
    IsAdmin,
};
