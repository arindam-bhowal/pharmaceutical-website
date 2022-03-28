const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: 'Admin',
    password: 'JanKalyan'
})

module.exports = mongoose.model('admin', adminSchema)