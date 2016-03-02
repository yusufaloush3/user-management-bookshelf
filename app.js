'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const configurePassport = require('./config/passport-jwt-config');
const User = require('./models/user');
const jwtAuth = require('./middlewear/jwt-authenticate');
const authorizedRoles = require('./middlewear/roles-authorize');
const authController = require('./controllers/auth-controller');

const app = express();
app.use(passport.initialize());
configurePassport();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authController);

app.get('/users', function(req, res) {
    User.fetchAll().then(function(users) {
        res.json(users);
    });
});

app.get('/securedArea', jwtAuth, authorizedRoles('Rob', 'Someone Else'), function(req, res) {
    res.json({msg: "You made it to the secure area"});
});

app.listen(3000);