'use strict';

const bookshelf = require('../bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));

module.exports = bookshelf.Model.extend({
    tableName: 'user',
    validPassword(password) {
        return bcrypt.compareAsync(password, this.attributes.password);
    },
    initialize() {
        this.on('saving', model => {
            if (!model.hasChanged('password')) return;

            return Promise.coroutine(function* () {
                const salt = yield bcrypt.genSaltAsync(10);
                const hashedPassword = yield bcrypt.hashAsync(model.attributes.password, salt);
                model.set('password', hashedPassword);
            })();
        });
    }
});