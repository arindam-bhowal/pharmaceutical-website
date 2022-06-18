const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

// ====================
// Register Doctors : Do not require jwt
// ====================

router.post("/register", async (req, res) => {
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
  
  // ====================
  // Login
  // ====================
  router.post("/login", async (req, res) => {
    try {
      const reqDoctor = await Doctor.findOne({ email: req.body.email });
      // Todo:: the error message
      !reqDoctor && res.status(404).json({
        msg: "User with this credentials not found",
        status: 404
      });
      // ==check Password==
      if (
        req.body.password ===
        CryptoJs.AES.decrypt(
          reqDoctor.password,
          process.env.SECRETE_MESSAGE
        ).toString(CryptoJs.enc.Utf8)
      ) {
        const jwt_data = {
          id: reqDoctor._id,
        };
        const doctorAuthToken = jwt.sign(jwt_data, process.env.JWT_TOKEN, {
          expiresIn: "7d",
        });
        const { password, ...otherInfo } = reqDoctor._doc;
        res.status(200).json({ otherInfo, doctorAuthToken });
      } else {
        // Todo:: the error message
        res.status(404).json({
          msg: "Invalid credentials",
          status: 404
        });
      }
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
router.get("/find/:doctorId", async (req, res) => {
  try {
    const reqDoctor = await Doctor.findById(req.params.doctorId);
    // const { password, ...otherInfo } = reqDoctor._doc;
    res.status(200).json(reqDoctor);
  } catch (error) {
    // We will come to the error page later
    res.status(500).json(error);
  }
});

// ----------------------Get all Doctors from database ----------------
router.get("/all", async (req, res) => {
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
router.put("/update/:doctorId", async (req, res) => {
  try {
    if (req.body.password) {
      const encryptedPassword = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRETE_MESSAGE
      ).toString();
        req.body.password = encryptedPassword
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

router.delete('/delete/:doctorId', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.doctorId)
    res.status(200).json('Deleted doctor successfully!!')
  } catch (error) {
    res.status(500).json(error);
  }
})
// ----------------------Find a Worker using referalId ----------------

router.get('/referedBy/:referalId', async (req, res) => {
  try {
    const reqDoctor = await Doctor.findOne({ referalId: req.params.referalId})
    const { name, email, phoneNumber} = reqDoctor._doc
    res.status(200).json({name, email, phoneNumber})
  } catch (error) {
    return 'error'
  }
})




module.exports = router;