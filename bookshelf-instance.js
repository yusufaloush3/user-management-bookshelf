'use strict';

const dbConfig = require('./config/database-config');
const knex = require('knex')(dbConfig);

module.exports = require('bookshelf')(knex);

