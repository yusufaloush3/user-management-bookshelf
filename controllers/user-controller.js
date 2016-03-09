'use strict';

const express = require('express');
const User = require('../models/user');
const jwtAuth = require('../middleware/jwt-authenticate');
const authorizedRoles = require('../middleware/roles-authorize');

const router = express.Router();

router.get('/', function(req, res) {
    User.fetchAll().then(function(users) {
        res.json(users);
    });
});

router.get('/securedArea', jwtAuth, authorizedRoles('ROLE_ADMIN'), function(req, res) {
    res.json({msg: "You made it to the secure area"});
});

module.exports = router;