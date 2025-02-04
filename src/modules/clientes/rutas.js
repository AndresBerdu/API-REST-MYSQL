const express = require('express');
const respuesta = require('../../red/respuestas.js')

const router = express.Router();
const controlador = require('./index.js');

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', eliminar);

async function todos (req, res, next) {
    try {
        const items = await controlador.todos()
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
};

async function uno (req, res, next) {
    try {
        const items = await controlador.uno(req.params.id)
        respuesta.success(req, res, items, 200);        
    } catch (error) {
       next(error);
    }
};

async function agregar (req, res, next) {
    try {
        await controlador.agregar(req.body);
        if(req.body.id == 0) {
            mensaje = 'Item guardado con exito';
        } else {
            mensaje = 'Item actualizado con exito'
        }
        respuesta.success(req, res, 'item guardado satisfactoriamente', 201);        
    } catch (error) {
       next(error);
    }
};

async function eliminar (req, res, next) {
    try {
        await controlador.eliminar(req.body)
        respuesta.success(req, res, 'item eliminado satisfactoriamente', 200);        
    } catch (error) {
       next(error);
    }
};

module.exports = router;