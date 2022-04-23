const mongoose = require('mongoose')

const pharmacySchema = new mongoose.Schema({
    branch: {type: String, required: true},
    drugLicenseNo: {type: String, required: true, unique: true},
    ownerName : {type: String, required: true, unique: true},
    address : {type: String}
})

module.exports = mongoose.model('Pharmacies', pharmacySchema)