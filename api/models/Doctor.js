const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, max: 50 },
  email: { type: String, required: true, unique: true, max: 50 },
  password: {type:String, min: 6},
  phoneNumber: { type: Number, required: true, length: 10 },
  sex: String,
  age: Number,
  profilePic: String,
  govtId: String,
  registrationNo: {type: String, required: true, unique: true}
});

module.exports = mongoose.model("Doctors", doctorSchema);
