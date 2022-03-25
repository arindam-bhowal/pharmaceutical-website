const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express()

const patientAuth = require('./routes/patientAuth')



// -----------------Middle wares ---------------
app.use(express.json())
app.use(cors())


// ------------------------------ALL ROUTES---------------------------------

// ===========
// For Patients
// ===========
app.use('/api/patient', patientAuth)



// -----------------Listing to port ---------------
app.listen(8800, () => {
    console.log('The backend server is running successfully!!')
})