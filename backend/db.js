const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "luxury_rental_db"
});

connection.connect((err) => {
    if(err){
        console.log("Database Connection Failed");
    } else {
        console.log("Connected to MySQL");
    }
});

module.exports = connection;