const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(function(err){
    if(err) {
        throw err;
    } else {
        console.log("MySql conectado!");
    }
});

module.exports = connection;