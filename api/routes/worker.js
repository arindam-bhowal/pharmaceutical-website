const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");


// ===========================================================================================

// ====================
// Register Workers : Do not require jwt
// ====================

router.post("/register", async (req, res) => {
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

// ====================
// Login
// ====================
router.post("/login", async (req, res) => {
  try {
    const reqWorker = await Worker.findOne({ email: req.body.email });
    // Todo:: the error message
    !reqWorker && res.status(404).json("User with this credentials not found");
    // ==check Password==
    if (
      req.body.password ===
      CryptoJs.AES.decrypt(
        reqWorker.password,
        process.env.SECRETE_MESSAGE
      ).toString(CryptoJs.enc.Utf8)
    ) {
      const jwt_data = {
        id: reqWorker._id,
      };
      const workerAuthToken = jwt.sign(jwt_data, process.env.JWT_TOKEN, {
        expiresIn: "7d",
      });
      const { password, ...otherInfo } = reqWorker._doc;
      res.status(200).json({ otherInfo, workerAuthToken });
    } else {
      // Todo:: the error message
      res.status(404).json("Invalid credentials");
    }
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
});


// ================
// Workers CRUD operations
// ================

// ----------------------Find a Worker from database ----------------
router.get("/find/:workerId", async (req, res) => {
  try {
    const reqWorker = await Worker.findById(req.params.workerId);
    const { password, ...otherInfo } = reqWorker._doc;
    res.status(200).json(otherInfo);
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Find a Worker using referalId ----------------

router.get('/referedBy/:referalId', async (req, res) => {
  try {
    const reqWorker = await Worker.findOne({ referalId: req.params.referalId})
    const { name, email, phoneNumber} = reqWorker._doc
    res.status(200).json({name, email, phoneNumber})
  } catch (error) {
    return 'error'
  }
})


// ----------------------Get all Workers from database ----------------
router.get("/all", async (req, res) => {
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
router.put("/update/:workerId", async (req, res) => {
  try {
    if (req.body.password) {
      const encryptedPassword = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRETE_MESSAGE
      ).toString();
        req.body.password = encryptedPassword
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



module.exports = router;