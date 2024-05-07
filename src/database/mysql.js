const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

const connectionMySql = () => {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if(err) {
            console.log(("[db err]"), err);
            setTimeout(connectionMySql, 200);
        } else {
            console.log("db conectada!!!")
        }
    });

    conexion.on('error', err => {
        console.log(("[db err]"), err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectionMySql();
        } else {
            throw err;
        }
    })
}

connectionMySql();

const todos = (tabla) => {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}` , (error, result) => {
            return error ? reject(error) : resolve(result)
        })
    })
}

const uno = (tabla, id) => {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`  , (error, result) => {
            if(error) return reject(error);
            resolve(result)
        })
    })
}

const insertar = (tabla, data) => {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            if(error) return reject(error);
            resolve(result)
        })
    })
}

const actualizar = (tabla, data) => {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, data.id] , (error, result) => {
            if(error) return reject(error);
            resolve(result)
        })
    })
}

const agregar = (tabla, data) => {
    if(data && data.id == 0) {
        return insertar(tabla, data);
    } else {
        return actualizar(tabla, data);
    }
}

const eliminar = (tabla, data) => {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id , (error, result) => {
            if(error) return reject(error);
            resolve(result)
        })
    })
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar
};