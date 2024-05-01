const mysql = require("mysql2");

const pool = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "",
    database : "todo_tasks",
    waitForConnections : true,
    connectionLimit : 10,
    maxIdle : 10,
    idleTimeout : 60000,
    queueLimit : 0
});

pool.getConnection((err, connection) => {
    if (err)
        throw err;
    console.log('Database connected successfully');
    connection.release();
    return connection;
});

module.exports = pool;