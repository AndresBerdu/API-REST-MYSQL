const database = require('../../database/mysql');

const tabla = 'clientes';

module.exports = function(databaseInyectada) {

    let db = databaseInyectada;

    if(!db) {
        db = require('../../database/mysql');
    }

    const todos = () => {
        return database.todos(tabla);
    }
    
    const uno = (id) => {
        return database.uno(tabla, id);
    }
    
    const agregar = (body) => {
        return database.agregar(tabla, body);
    }
    
    const eliminar = (body) => {
        return database.eliminar(tabla, body);
    }
    
    return {
        todos,
        uno,
        agregar,
        eliminar
    }
}