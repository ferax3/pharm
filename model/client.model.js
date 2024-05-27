// Підключання до БД
var connection = require('./../config/config.bd');
// Функція для створення об'єкту Client
var Client = function (client){
    this.id_client = client.id_client;
    this.name = client.name;
    this.birthday = client.birthday;
    this.telephone = client.telephone;
}
// Створення нового запису у БД
// newCl - об'єкт клієнт зі значенням які створюється
// result - результат створення
Client.create = function (newCl, result) {
    connection.query("INSERT INTO client set ?", newCl, function(err, res){
        if (err) {
            console.log('error: ', err);
            result(err, null);
        }
        else {
            console.log(res.insertID);
            result(null, res.insertID);
        }
    });
};
//Пошук у таблиці за id
//id - значення id клієнта
//result - результат запиту з пошуку
Client.findByID = function (id, result) {
    connection.query("Select * from client where id_client = ? ", id,
        function(err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                result(null, res);
            }
        });
};
//Виведення усіх клієнтів, що є в таблиці
//result - результат запиту
Client.findAll = function (result) {
    connection.query("Select * from client", 
    function(err, res){
        if(err){
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("Client : ", res);
            result(null, res);
        }
    });
};
// Зміна запису з певним id у БД
// id - значення id клієнта
// cl - значення, що змінюється включає назву клієнта
// result - результат запиту
Client.update = function (id, cl, result) {
    connection.query("UPDATE client SET name=? WHERE id_client = ?",
        [cl.name, id],
        function (err, res) {
            if(err, res){
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });
};
//Видалення запису з певним id у БД
//id - значення id клієнту
//result - результат запиту
Client.delete = function (id, result) {
    connection.query("DELETE FROM client WHERE id_client = ?", [id],
        function (err, res){
            if (err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                result(null, res);
            }
        });
};
//Вказуємо, що експортуємо з модуля Client
module.exports = Client;