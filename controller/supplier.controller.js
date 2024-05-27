//!ДОДАЄМО ДЛЯ ВИВЕДЕННЯ
const express = require('express')
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);

const Supplier = require('../model/supplier.model');
exports.findAll = function (req, res) {
    Supplier.findAll(function(err, supplier){
        console.log('controller_supplier');
        if (err)
            res.send(err);
        //! З'єднаємо з файлом виведення
        res.render('supplier.ejs', {Supplier: supplier});
        // res.send(supplier);
    });
};
exports.create = function (req, res) {
    const new_supplier = new Supplier(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else{
        Supplier.create(new_supplier, function (err, supplier) {
            if(err)
                res.send(err);
            //!Переходимо на сторінку з таблицею клієнтів
            res.redirect('/api/supplier')
            // res.json({error : false, message: 'supplier added successfully!', data: supplier});
        });
    }
};
//Пошук за id
exports.findById = function (req, res) {
    Supplier.findByID(req.params.id, function(err, supplier){
        if (err)
            res.send(err);
        //!Перехід на сторінку редагування
        res.render('supplier_edit.ejs', {Supplier: supplier});
        // res.json(supplier);
    });
};
//редагування інформації
exports.update = function (req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error: true, message: 'Please provide all required field'});
    } else {
        Supplier.update(req.params.id, new Supplier(req.body), function(err, supplier){
            if(err)
                res.send(err);
            //!Повернення на сторінку з таблицею клієнтів
            res.redirect('/api/supplier')
            // res.json({error: false, message: 'supplier successfully update'});
        });
    }
};
//видалення інформації
exports.delete = function (req, res) {
    Supplier.delete(req.params.id, function(err, supplier){
        console.log('HI'+req.params.id);
        if(err)
            res.send(err);
        //!Повернення на сторінку з таблицею клієнтів
        res.redirect('/api/supplier')
        // res.json({error: false, message: 'supplier successfully deleted'});
    });
};