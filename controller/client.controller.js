const Client = require('../model/client.model');
exports.findAll = function (req, res) {
    Client.findAll(function(err, client){
        console.log('controller');
        if (err)
            res.send(err);
        res.send(client);
    });
};
exports.create = function (req, res) {
    const new_client = new Client(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else{
        Client.create(new_client, function (err, client) {
            if(err)
                res.send(err);
            res.json({error : false, message: 'client added successfully!', data: client});
        });
    }
};
//Пошук за id
exports.findById = function (req, res) {
    Client.findByID(req.params.id, function(err, client){
        if (err)
            res.send(err);
        res.json(client);
    });
};
//редагування інформації
exports.update = function (req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error: true, message: 'Please provide all required field'});
    } else {
        Client.update(req.params.id, new Client(req.body), function(err, client){
            if(err)
                res.send(err);
            res.json({error: false, message: 'client successfully update'});
        });
    }
};
//видалення інформації
exports.delete = function (req, res) {
    Client.delete(req.params.id, function(err, client){
        console.log('HI'+req.params.id);
        if(err)
            res.send(err);
        res.json({error: false, message: 'client successfully deleted'});
    });
};