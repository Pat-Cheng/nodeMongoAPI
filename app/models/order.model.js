const mongoose = require('mongoose');


const OrdersSchema = mongoose.Schema({
    Email: String,
    DateOrdered: Date,
    OrderStatus: String,
    Inventory: String //id from inventorydb
})