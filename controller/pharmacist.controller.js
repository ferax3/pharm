//!ДОДАЄМО ДЛЯ ВИВЕДЕННЯ
const express = require('express')
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);

const Pharmacist = require('../model/pharmacist.model');
exports.findAll = function (req, res) {
    Pharmacist.findAll(function(err, pharmacist){
        console.log('controller_Ph');
        if (err)
            res.send(err);
        //! З'єднаємо з файлом виведення
        res.render('pharmacist.ejs', {Pharmacist: pharmacist});
        //res.send(pharmacist);
    });
};
exports.create = function (req, res) {
    const new_pharmacist = new Pharmacist(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else{
        Pharmacist.create(new_pharmacist, function (err, pharmacist) {
            if(err)
                res.send(err);
            //!Переходимо на сторінку з таблицею клієнтів
            res.redirect('/api/pharmacist')
            //res.json({error : false, message: 'pharmacist added successfully!', data: pharmacist});
        });
    }
};
//Пошук за id
exports.findById = function (req, res) {
    Pharmacist.findByID(req.params.id, function(err, pharmacist){
        if (err)
            res.send(err);
        //!Перехід на сторінку редагування
        res.render('pharmacist_edit.ejs', {Pharmacist: pharmacist});
        // res.json(pharmacist);
    });
};
//редагування інформації
exports.update = function (req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error: true, message: 'Please provide all required field'});
    } else {
        Pharmacist.update(req.params.id, new Pharmacist(req.body), function(err, pharmacist){
            if(err)
                res.send(err);
            //!Повернення на сторінку з таблицею клієнтів
            res.redirect('/api/pharmacist')
            //res.json({error: false, message: 'pharmacist successfully update'});
        });
    }
};
//видалення інформації
exports.delete = function (req, res) {
    Pharmacist.delete(req.params.id, function(err, pharmacist){
        console.log('HI'+req.params.id);
        if(err)
            res.send(err);
        res.redirect('/api/pharmacist')
        // res.json({error: false, message: 'pharmacist successfully deleted'});
    });
};