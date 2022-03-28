const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, max: 50 },
  email: { type: String, required: true, unique: true, max: 50 },
  password: {type: String, required: true, min:6},
  phoneNumber: {type: Number, required: true, length: 10},
  sex: String,
  age: Number,
  profilePic: String,
  id: String
});

module.exports = mongoose.model("Patients", patientSchema);
