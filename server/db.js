const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql123',
    database: 'EmployeeDB',
});

module.exports = pool.promise();
