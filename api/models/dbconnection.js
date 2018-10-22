var mysql = require('mysql');

// Connecting to mysql database
console.log('Connecting to the database.....');
var connection = mysql.createConnection({
    database: 'mssDB',
    host: "localhost",
    user: "root",
    password: "abcd1234!"
});

connection.connect(function(err) {
    if (err) 
        throw err;
    console.log("Connected to the database!!");
});

module.exports = connection;