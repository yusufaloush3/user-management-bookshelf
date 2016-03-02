'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

module.exports = function() {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = 'secret';
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.where('id', jwt_payload.id).fetch()
            .then(user => user ? done(null, user) : done(null, false))
            .catch(err => done(err, false));
    }));
};