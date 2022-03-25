const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
    drugName: {type: String, required: true},
    manufacturer: String,
    expireDate: Number,
    costPrice: Number,
    sellingPrice: {type: Number, required: true},
    quantity: Number
})

module.exports = mongoose.model('Medicines', medicineSchema)