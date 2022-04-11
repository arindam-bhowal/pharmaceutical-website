const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Worker = require("../models/Worker");
const Medicine = require("../models/Medicine");
const CryptoJs = require("crypto-js");

// ============================================================================================================================================
// ============================================================================================================================================

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

// ----------------------Delete a Patient details from database ----------------
router.delete("/patient/delete/:patientId", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.patientId);
    res.status(200).json("Successfully deleted patient details!!");
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
    const data = await User.aggregate([
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
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});





// ============================================================================================================================================
// ============================================================================================================================================

// ====================
// Register Doctors : Do not require jwt
// ====================

router.post("/doctor/register", async (req, res) => {
  const encryptedPassword = CryptoJs.AES.encrypt(
    req.body.password,
    process.env.SECRETE_MESSAGE
  ).toString();
  req.body.password = encryptedPassword;
  const newDoctor = new Doctor(req.body);
  try {
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});

//   =========================================================================================

// ================
// Doctor CRUD operations
// ================

// ----------------------Find a Doctor from database ----------------
router.get("/doctor/find/:doctorId", async (req, res) => {
  try {
    const reqDoctor = await Doctor.findById(req.params.doctorId);
    const { password, ...otherInfo } = reqDoctor._doc;
    res.status(200).json(otherInfo);
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Get all Doctors from database ----------------
router.get("/doctor/all", async (req, res) => {
  try {
    const allDoctors = await Doctor.find();
    const reqDataAllDoctors = [];
    allDoctors.map((doctor) => {
      const { password, ...otherInfo } = doctor._doc;
      reqDataAllDoctors.push(otherInfo);
    });
    res.status(200).json(reqDataAllDoctors);
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Update a Doctor details from database ----------------
router.put("/doctor/update/:doctorId", async (req, res) => {
  try {
    if (req.body.password) {
      const encryptedPassword = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRETE_MESSAGE
      ).toString();
      req.body.password = encryptedPassword;
    }
    await Doctor.findByIdAndUpdate(
      req.params.doctorId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("User Information is updated successfully!!");
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Delete a Doctor details from database ----------------

router.delete("/doctor/delete/:doctorId", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.doctorId);
    res.status(200).json("Successfully deleted patient details!!");
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ============================================================================================================================================
// ============================================================================================================================================

// ====================
// Register Workers : Do not require jwt
// ====================

router.post("/worker/register", async (req, res) => {
  const encryptedPassword = CryptoJs.AES.encrypt(
    req.body.password,
    process.env.SECRETE_MESSAGE
  ).toString();
  req.body.password = encryptedPassword;
  const newWorker = new Worker(req.body);
  try {
    await newWorker.save();
    res.status(201).json(newWorker);
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});

// ================
// Workers CRUD operations
// ================

// ----------------------Find a Worker from database ----------------
router.get("/worker/find/:workerId", async (req, res) => {
  try {
    const reqWorker = await Worker.findById(req.params.workerId);
    const { password, ...otherInfo } = reqWorker._doc;
    res.status(200).json(otherInfo);
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Get all Workers from database ----------------
router.get("/worker/all", async (req, res) => {
  try {
    const allWorkers = await Worker.find();
    const reqDataAllWorkers = [];
    allWorkers.map((worker) => {
      const { password, ...otherInfo } = worker._doc;
      reqDataAllWorkers.push(otherInfo);
    });
    res.status(200).json(reqDataAllWorkers);
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Update a Worker details from database ----------------
router.put("/worker/update/:workerId", async (req, res) => {
  try {
    if (req.body.password) {
      const encryptedPassword = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRETE_MESSAGE
      ).toString();
      req.body.password = encryptedPassword;
    }
    await Worker.findByIdAndUpdate(
      req.params.workerId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("User Information is updated successfully!!");
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Delete a Worker details from database ----------------

router.delete("/worker/delete/:workerId", async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.workerId);
    res.status(200).json("Successfully deleted patient details!!");
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ============================================================================================================================================
// ============================================================================================================================================

// ================
// Medicine CRUD operations
// ================

// -------------Add New Medicine to database-------------
router.post("/medicine/new", async (req, res) => {
  const newMedicine = new Medicine(req.body);
  try {
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});

// -------------Find a Medicine from database-------------
router.get("/medicine/get/:medicineId", async (req, res) => {
  try {
    const reqMed = await Medicine.findById(req.params.medicineId);
    res.status(200).json(reqMed);
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});

// -------------Find all Medicines from database-------------
router.get("/medicine/all", async (req, res) => {
  try {
    const allMeds = await Medicine.find();
    res.status(200).json(allMeds);
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});

// -------------Update details of a Medicine -------------
router.put("/medicine/update/:medicineId", async (req, res) => {
  try {
    await Medicine.findByIdAndUpdate(
      req.params.medicineId,
      { $set: req.body },
      { new: true }
    );
    // To do later
    res.status(200).json("Updated medicine info");
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});

// ------------- Delete a medicine from database -------------
router.delete("/medicine/delete/:medicineId", async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.medicineId);
    // To do later
    res.status(200).json("Deleted medicine details successfully!!");
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});

module.exports = router;
