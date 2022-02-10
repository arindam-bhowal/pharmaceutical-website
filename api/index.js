const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express()



// -----------------Middle wares ---------------
app.use(express.json())
app.use(cors())


// -----------------Listing to port ---------------
app.listen(8800, () => {
    console.log('The backend server is running successfully!!')
})