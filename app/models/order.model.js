const mongoose = require('mongoose');


const OrdersSchema = mongoose.Schema({
    Email: String,
    DateOrdered: Date,
    OrderStatus: String,
    Inventory: [{
        Name: String,
        Description: String,
        Price: Number,
        QuantityAvailable: Number
    }]
})