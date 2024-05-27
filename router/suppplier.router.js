const express = require('express')
const router = express.Router()
const supplierController = require('../controller/supplier.controller');
//Перегляд всіх клієнтів
router.get('/', supplierController.findAll);//
//Створення нового клієнта
router.post('/', supplierController.create);//
//Пошук клієнта за id
router.get('/:id', supplierController.findById);//
//Редагування клієнта id
router.put('/:id', supplierController.update);//
// Видалення клієнта за id
router.delete('/:id', supplierController.delete);//
//Експортуємо за замовченням router
module.exports = router