const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express()

const patientAuthRoute = require('./routes/patientAuth')
const patientRoute = require('./routes/patient')
const medicineRoute = require('./routes/medicine')


// -----------------Middle wares ---------------
app.use(express.json())
app.use(cors())


// ------------------------------ALL ROUTES---------------------------------

// ===========
// For Patients
// ===========
app.use('/api/patient', patientAuthRoute)
app.use('/api/patient', patientRoute)
// ===========
// For Medicines
// ===========
app.use('/api/medicine', medicineRoute)


// -----------------Listing to port ---------------
app.listen(8800, () => {
    console.log('The backend server is running successfully!!')
})