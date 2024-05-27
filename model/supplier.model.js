// Підключання до БД
var connection = require('./../config/config.bd');
// Функція для створення об'єкту Supplier
var Supplier = function (supplier){
    this.id_supplier = supplier.id_supplier;
    this.name = supplier.name;
    this.country = supplier.country;
}
// Створення нового запису у БД
// newCl - об'єкт клієнт зі значенням які створюється
// result - результат створення
Supplier.create = function (newSp, result) {
    connection.query("INSERT INTO supplier set ?", newSp, function(err, res){
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
Supplier.findByID = function (id, result) {
    connection.query("Select * from supplier where id_supplier = ? ", id,
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
Supplier.findAll = function (result) {
    connection.query("Select * from supplier", 
    function(err, res){
        if(err){
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("Supplier : ", res);
            result(null, res);
        }
    });
};
// Зміна запису з певним id у БД
// id - значення id клієнта
// cl - значення, що змінюється включає назву клієнта
// result - результат запиту
Supplier.update = function (id, cl, result) {
    connection.query("UPDATE supplier SET name = ? WHERE id_supplier = ?",
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
Supplier.delete = function (id, result) {
    connection.query("DELETE FROM supplier WHERE id_supplier = ?", [id],
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
//Вказуємо, що експортуємо з модуля Supplier
module.exports = Supplier;