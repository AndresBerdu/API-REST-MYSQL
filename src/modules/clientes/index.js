const database = require('../../database/mysql');
const controlador = require('./controlador');

module.exports = controlador(database);