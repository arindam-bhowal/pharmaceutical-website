const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
    drugName: {type: String, required: true, unique: true},
    manufacturer: String,
    expireDate: {type: Date},
    costPrice: Number,
    sellingPrice: {type: Number, required: true},
    quantity: {type: Number, required: true},
    location: {type: String, required: true}
})

module.exports = mongoose.model('Medicines', medicineSchema)