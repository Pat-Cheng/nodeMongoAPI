const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    Name: String,
    Description: String,
    Price: Number,
    QuantityAvailable: Number
}, {
    timestamps:true
});

module.exports = mongoose.model('Inventory',InventorySchema);