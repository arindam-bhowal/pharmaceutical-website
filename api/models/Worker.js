const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true, max: 50 },
  email: { type: String, required: true, unique: true, max: 50 },
  phoneNumber: { type: Number, required: true, length: 10 },
  password: {type: String, required: true, min: 6},
  sex: String,
  age: Number,
  profilePic: String,
  id: String,
  branch: {type: String, required: true}
});

module.exports = mongoose.model("Workers", workerSchema);
