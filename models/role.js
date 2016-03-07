'use strict';

const bookshelf = require('../bookshelf-instance');
const User = require('./user');

module.exports = bookshelf.Model.extend({
    tableName: 'role',
    users: function() {
        return this.belongsToMany(User, 'user_role');
    }
});