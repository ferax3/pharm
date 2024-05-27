const Supplier = require('../model/supplier.model');
exports.findAll = function (req, res) {
    Supplier.findAll(function(err, supplier){
        console.log('controller_supplier');
        if (err)
            res.send(err);
        res.send(supplier);
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
            res.json({error : false, message: 'supplier added successfully!', data: supplier});
        });
    }
};
//Пошук за id
exports.findById = function (req, res) {
    Supplier.findByID(req.params.id, function(err, supplier){
        if (err)
            res.send(err);
        res.json(supplier);
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
            res.json({error: false, message: 'supplier successfully update'});
        });
    }
};
//видалення інформації
exports.delete = function (req, res) {
    Supplier.delete(req.params.id, function(err, supplier){
        console.log('HI'+req.params.id);
        if(err)
            res.send(err);
        res.json({error: false, message: 'supplier successfully deleted'});
    });
};