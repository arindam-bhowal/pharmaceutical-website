const mongoose = require('mongoose')

const pharmacySchema = new mongoose.Schema({
    branch: {type: String, required: true},
    drugLicenseNo: {type: String, required: true}
})

module.exports = mongoose.model('Pharmacies', pharmacySchema)