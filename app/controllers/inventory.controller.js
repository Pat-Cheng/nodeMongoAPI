const Inventory = require('../models/inventory.model.js');


// Post call to create a new inventory entry in DB.
exports.create = (req, res) => {
    if(!req.body.Name || !req.body.Price){
        return res.status(400).send({
            message: "empty inventory cannot be added"
        });
    }

    const inventory = new Inventory(
        {
            Name: req.body.Name,
            Description: req.body.Description,
            Price: req.body.Price,
            QuantityAvailable: req.body.QuantityAvailable
        }
    );

    inventory.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error creating inventory."
        });
    });
};

//Get all inventories
exports.getAll = (req, res) => {
    Inventory.find()
    .then(inv =>{
        res.send(inv);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving all inventory."
        });
    });
};

//Get specified inventory
exports.getOne = (req, res) => {
    Inventory.findById(req.params.inventoryId)
    .then(inv => {
        if(!inv) {
            return res.statsu(404).send({
                message: "Inventory with id " + req.params.inventoryId + " was not found."
            });
        }
        res.send(inv);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Inventory with id " + req.params.inventoryId + " was not found."
            });
        }

        return res.status(500).send({
            message: "Error retrieving inventory " + req.params.inventoryId
        });
    });
};

//Put call to update inventory. 
exports.update = (req, res) => {
    if(!req.body.Name || !req.body.Price) {
        return res.status(400).send({
            message: "Inventory cannot be empty."
        });
    }

    Inventory.findByIdAndUpdate(req.params.inventoryId, {
        Name: req.body.Name,
        Description: req.body.Description,
        Price: req.body.Price,
        QuantityAvailable: req.body.QuantityAvailable
    }, {new: true})
    .then(inv => {
        if(!inv){
            return res.status(404).send({
                message: "Inventory with id " + req.params.inventoryId + " was not found."
            });
        }
        res.send(inv);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).semd({
                message: "Inventory with id " + req.params.inventoryId + " was not found."
            });
        }
        return res.status(500).send({
            message: "Error update inventory id " + req.params.inventoryId
        });
    });
};

//Delete call to delete inventory.
exports.delete = (req, res) => {
    Inventory.findByIdAndRemove(req.params.inventoryId)
    .then(inv => {
        if(!inv){
            return res.status(404).send({
                message: "Inventory with id " + req.params.inventoryId + " was not found."
            });
        }
        res.send({message: "Inventory has been successfully deleted."});
    }).catch(err => {
        if(err.kidn === 'objectId' || err.name === 'NotFound'){
            return res.status(404).send({
                message: "Inventory with id " + req.params.inventoryId + " was not found."
            });
        }
        return res.status(500).send({
            message: "UNable to delete inventory with id " + req.params.inventoryId
        });
    });
};