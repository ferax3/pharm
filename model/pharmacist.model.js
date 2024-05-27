// Підключання до БД
var connection = require('./../config/config.bd');
// Функція для створення об'єкту Pharmacist
var Pharmacist = function (pharmacist){
    this.id_pharmacist = pharmacist.id_pharmacist;
    this.full_name = pharmacist.full_name;
    this.birthday = pharmacist.birthday;
    this.work_exp = pharmacist.work_exp;
}
// Створення нового запису у БД
// newPhr - об'єкт фармацевт зі значенням які створюється
// result - результат створення
Pharmacist.create = function (newPhr, result) {
    connection.query("INSERT INTO pharmacist set ?", newPhr, function(err, res){
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
//id - значення id фармацевта
//result - результат запиту з пошуку
Pharmacist.findByID = function (id, result) {
    connection.query("Select * from pharmacist where id_pharmacist = ? ", id,
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
//Виведення усіх фармацевтів, що є в таблиці
//result - результат запиту
Pharmacist.findAll = function (result) {
    connection.query("Select * from pharmacist", 
    function(err, res){
        if(err){
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log("Pharmacist : ", res);
            result(null, res);
        }
    });
};
// Зміна запису з певним id у БД
// id - значення id фармацевта
// phr - значення, що змінюється включає назву фармацевта
// result - результат запиту
Pharmacist.update = function (id, phr, result) {
    connection.query("UPDATE pharmacist SET full_name=? WHERE id_pharmacist = ?",
        [phr.full_name, id],
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
//id - значення id фармацевта
//result - результат запиту
Pharmacist.delete = function (id, result) {
    connection.query("DELETE FROM pharmacist WHERE id_pharmacist = ?", [id],
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
//Вказуємо, що експортуємо з модуля Pharmacist
module.exports = Pharmacist;