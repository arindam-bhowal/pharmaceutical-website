const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

// ================
// Medicine CRUD operations
// ================

// -------------Add New Medicine to database-------------
router.post("/new", async (req, res) => {
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
router.get('/get/:medicineId', async (req, res) => {
  try {
    const reqMed = await Medicine.findById(req.params.medicineId)
    res.status(200).json(reqMed)
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
})

// -------------Find all Medicines from database-------------
router.get('/all', async (req, res) => {
  try {
    const allMeds = await Medicine.find()
    res.status(200).json(allMeds)
  } catch (error) {
    // We will come to this latter
    console.log(error);
  }
})

// -------------Update details of a Medicine -------------
router.put('/update/:medicineId', async (req, res) => {
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
router.delete('/delete/:medicineId', async (req, res) => {
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