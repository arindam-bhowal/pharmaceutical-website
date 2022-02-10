const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

connectToMongo().catch(err => console.log(err));

async function connectToMongo() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Successfully connected to MongoDb')
}

module.exports = connectToMongo