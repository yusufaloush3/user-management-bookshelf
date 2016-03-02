module.exports = function(...authorizedRoles) {
    return function (req, res, next) {
        if (authorizedRoles.indexOf(req.user.attributes.username) === -1) {
            res.status(403);
            res.send('Not permitted');
            return;
        }
        next();
    }
};

