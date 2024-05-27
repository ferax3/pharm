const express = require('express')
const router = express.Router()
const clientController = require('../controller/client.controller');
//Перегляд всіх клієнтів
router.get('/', clientController.findAll);
//Створення нового клієнта
router.post('/', clientController.create);
//Пошук клієнта за id
router.get('/:id', clientController.findById);
//Редагування клієнта id
router.put('/:id', clientController.update);
// Видалення клієнта за id
router.delete('/:id', clientController.delete);
//Експортуємо за замовченням router
module.exports = router