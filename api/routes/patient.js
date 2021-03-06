const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

// ===========================================================================================

// ====================
// Register Patients : Do not require jwt
// ====================

router.post("/register", async (req, res) => {
  const alreadyRegistered = await Patient.findOne({ email: req.body.email });

  if (alreadyRegistered) {
    res.status(403).json({
      msg: "Patient with this email is already registered",
      status: 403,
    });
  }

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
    !reqPatient &&
      res.status(404).json({
        msg: "User with this credentials not found",
        status: 404,
      });
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
      // const { password, ...otherInfo } = reqPatient._doc;
      res.status(200).json({ reqPatient, patientAuthToken });
    } else {
      // Todo:: the error message
      res.status(404).json({
        msg: "Incorrect Password",
        status: 404,
      });
    }
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});

// ================
// Patients CRUD operations
// ================

// ----------------------Find a Patient from database ----------------
router.get("/find/:patientId", async (req, res) => {
  try {
    const reqPatient = await Patient.findById(req.params.patientId);
    const { password, ...otherInfo } = reqPatient._doc;
    res.status(200).json(otherInfo);
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Get all Patients from database ----------------
router.get("/all", async (req, res) => {
  try {
    const allPatients = await Patient.find();
    const reqDataAllPatients = [];
    allPatients.map((patient) => {
      const { password, ...otherInfo } = patient._doc;
      reqDataAllPatients.push(otherInfo);
    });
    res.status(200).json(reqDataAllPatients);
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Update a Patient details from database ----------------
router.put("/update/:patientId", async (req, res) => {
  try {
    if (req.body.password) {
      const encryptedPassword = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRETE_MESSAGE
      ).toString();
      req.body.password = encryptedPassword;
    }
    await Patient.findByIdAndUpdate(
      req.params.patientId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("User Information is updated successfully!!");
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Patient Stats ----------------

router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Patient.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
