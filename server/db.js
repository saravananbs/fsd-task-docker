const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', //your password here
    database: 'EmployeeDB',
});

module.exports = pool.promise();
