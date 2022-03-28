const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const Medicine = require("../models/Medicine");
const CryptoJs = require("crypto-js");

// ================
// Patients CRUD operations
// ================


// ----------------------Create a new patient in database------------
router.post("/patient/register", async (req, res) => {
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

// ----------------------Find a Patient from database ----------------
router.get("/patient/find/:patientId", async (req, res) => {
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
router.get("/patient/all", async (req, res) => {
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
router.put("/patient/update/:patientId", async (req, res) => {
  try {
    if (req.body.password) {
      const encryptedPassword = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRETE_MESSAGE
      ).toString();
        req.body.password = encryptedPassword
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



// ================
// Medicine CRUD operations
// ================

// -------------Add New Medicine to database-------------
router.post("/medicine/new", async (req, res) => {
    const newMedicine = new Medicine(req.body);
    try {
        await newMedicine.save()
        res.status(201).json(newMedicine)
    } catch (error) {
      // We will come to this latter
      console.log(error);
    }
  });
  
  // -------------Find a Medicine from database-------------
  router.get('/medicine/get/:medicineId', async (req, res) => {
    try {
      const reqMed = await Medicine.findById(req.params.medicineId)
      res.status(200).json(reqMed)
    } catch (error) {
      // We will come to this latter
      console.log(error);
    }
  })
  
  // -------------Find all Medicines from database-------------
  router.get('/medicine/all', async (req, res) => {
    try {
      const allMeds = await Medicine.find()
      res.status(200).json(allMeds)
    } catch (error) {
      // We will come to this latter
      console.log(error);
    }
  })
  
  // -------------Update details of a Medicine -------------
  router.put('/medicine/update/:medicineId', async (req, res) => {
    try {
      await Medicine.findByIdAndUpdate(req.params.medicineId, { $set: req.body }, { new: true })
      // To do later
      res.status(200).json('Updated medicine info')
    } catch (error) {
      // We will come to this latter
      console.log(error);
    }
  })
  
  
  // ------------- Delete a medicine from database -------------
  router.delete('/medicine/delete/:medicineId', async (req, res) => {
    try {
      await Medicine.findByIdAndDelete(req.params.medicineId)
      // To do later
      res.status(200).json('Deleted medicine details successfully!!')
    } catch (error) {
      // We will come to this latter
      console.log(error);
    }
  })




module.exports = router;