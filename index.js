//console.log("БУ!");
// Підключаємо express
const express = require('express');
//Підключаємо bodyParser
const bodyParser = require('body-parser');
//Встановлюємо порт
const PORT = 5000;
const app = express();

//?var connection = require("./../config/config.bd");//???

//парсити запити типу content type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//парсити запити типу content-type - application/json
app.use(bodyParser.json())

// //Шаблони сторінок у форматі hbs
// app.set("view engine", "hbs");

//Обробка get запиту - endpoint
//Вхід
//Адреса за якою він буде працювати
//Функція, що буде виконуватися по запиту на цій endpoint
//Параметри функції
//req - запит
//res - відповідь
app.get('/', (req, res)=>{
    //Вказуємо 200 - успішний статус
    //json - тіло відповіді - повідомлення

    
    // res.status(200).json("Сервер працює");
    //! Запуск головної сторінки
    res.render('index.ejs');
})
//Require client routes
const clientRoutes = require('./router/client.routes')
app.use('/api/client', clientRoutes); 
//Require client routes
const pharmacistRoutes = require('./router/pharmacist.routes')
app.use('/api/pharmacist', pharmacistRoutes); 

//Require client routes
const supplierRoutes = require('./router/suppplier.router')
app.use('/api/supplier', supplierRoutes); 
//!Щоб на сервері бачити усі рішення
app.use(express.static("."));
//Створюємо екзепляр застосунку
//вхід
//порт
//callback функція, яка відпрацює лише у випадку успішного запуску серверу
app.listen(PORT,()=>console.log("SERVER SRART!!!"))
