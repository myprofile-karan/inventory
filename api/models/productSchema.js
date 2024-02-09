const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    name: String,
    price: Number,
    qty: Number,
    sum: Number,
})

const productModel = mongoose.model('Product', productschema);
module.exports = productModel