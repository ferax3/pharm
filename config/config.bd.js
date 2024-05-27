//import mysql from 'mysql'
const mysql = require('mysql');
//Створюємо нове з'єднання на локальному хості
//з вказаними параметрами
var connection = mysql.createConnection({
    host:"localhost",
    user: 'root',
    password: '',
    database: 'pharmacy_order'
});
//З'єднуємося з БД
//Якщо вдало - виводимо, що з'єднання відбулося
//Якщо ні виводимо помилку
connection.connect(function (err){
    if(!err){
        console.log("Database is connected");
    } else{
        console.log("Error while connection with database");
    }
});

//Експорт з'єднання
module.exports = connection;