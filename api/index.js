const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express()

const patientRoute = require('./routes/patient')
const medicineRoute = require('./routes/medicine')
const doctorRoute = require('./routes/doctor')

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
app.use('api/doctors', doctorRoute)

// ===========
// For Medicines
// ===========
app.use('/api/medicine', medicineRoute)




// ===========
// For Admin
// ===========




// -----------------Listing to port ---------------
app.listen(8800, () => {
    console.log('The backend server is running successfully!!')
})