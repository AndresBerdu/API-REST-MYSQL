const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const clientes = require('./modules/clientes/rutas.js');
const error = require('./red/errores.js') 

const app = express();

//Middeleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Configuración
app.set('port', config.app.port);

//rutas
app.use('/api/clientes', clientes);
app.use(error);

module.exports = app;