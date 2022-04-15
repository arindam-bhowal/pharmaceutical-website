const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express()

const patientRoute = require('./routes/patient')
const medicineRoute = require('./routes/medicine')
const doctorRoute = require('./routes/doctor')
const workerRoute = require('./routes/worker')

const adminRoute = require('./routes/admin')

const paymentRoute = require('./routes/payment')

// -----------------Middle wares ---------------
app.use(express.json())
app.use(cors())


// ------------------------------ALL ROUTES---------------------------------

// ===========
// For Patients
// ===========
app.use('/api/patient', patientRoute)

// ===========
// For Doctors
// ===========
app.use('/api/doctor', doctorRoute)

// ===========
// For Doctors
// ===========
app.use('/api/worker', workerRoute)

// ===========
// For Medicines
// ===========
app.use('/api/medicine', medicineRoute)



// ===========
// For Admin
// ===========
app.use('/api/admin', adminRoute)

// ===========
// For Payment
// ===========
app.use('/api/payment', paymentRoute)



// -----------------Listing to port ---------------
app.listen(8801, () => {
    console.log('The backend server is running successfully!!')
})