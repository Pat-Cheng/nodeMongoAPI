module.exports = (app) => {
    const inventory = require('../controllers/inventory.controller.js');

    //Create a new inventory
    app.post('/inventories', inventory.create)

    //Get all inventory
    app.get('/inventories', inventory.getAll)

    //Get one inventory using the GUID that is created by the database
    app.get('/inventories/:inventoryId', inventory.getOne)

    //Update one inventory using the GUID that is created by the database
    app.put('/inventories/:inventoryId', inventory.update)

    //Delete one inventory by the GUID that is created by the database
    app.delete('/inventories/:inventoryId', inventory.delete)
}