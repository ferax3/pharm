const express = require('express')
const router = express.Router()
const pharmacistController = require('../controller/pharmacist.controller');
//Перегляд всіх фармацевтів
router.get('/', pharmacistController.findAll);//
//Створення нового фармацевта
router.post('/', pharmacistController.create);//
//Пошук фармацевта за id
router.get('/:id', pharmacistController.findById);//
//Редагування фармацевта id
router.put('/:id', pharmacistController.update);//
//Видалення фармацевта за id
router.delete('/:id', pharmacistController.delete);//
//Експортуємо за замовченням router
module.exports = router