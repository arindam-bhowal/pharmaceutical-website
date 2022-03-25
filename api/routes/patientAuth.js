const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

// ====================
// Register Patients : Do not require jwt
// ====================

router.post("/register", async (req, res) => {
  const encryptedPassword = CryptoJs.AES.encrypt(
    req.body.password,
    process.env.SECRETE_MESSAGE
  ).toString();
  req.body.password = encryptedPassword;
  const newPatient = new Patient(req.body);
  try {
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});

// ====================
// Login
// ====================
router.post("/login", async (req, res) => {
  try {
    const reqPatient = await Patient.findOne({ email: req.body.email });
    // Todo:: the error message
    !reqPatient && res.status(404).json("User with this credentials not found");
    // ==check Password==
    if (
      req.body.password ===
      CryptoJs.AES.decrypt(
        reqPatient.password,
        process.env.SECRETE_MESSAGE
      ).toString(CryptoJs.enc.Utf8)
    ) {
      const jwt_data = {
        id: reqPatient._id,
      };
      const patientAuthToken = jwt.sign(jwt_data, process.env.JWT_TOKEN, {
        expiresIn: "7d",
      });
      const { password, ...otherInfo } = reqPatient._doc;
      res.status(200).json({ otherInfo, patientAuthToken });
    } else {
      // Todo:: the error message
      res.status(404).json("Invalid credentials");
    }
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});

module.exports = router;
