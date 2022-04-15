const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config();

// const razorpayInstance = new Razorpay({
  // key_iprocess: process.env.YOUR_KEY_ID,
  // key_secret: process.env.YOUR_SECRET,
// });

const razorpayInstance = new Razorpay({
  key_id: process.env.YOUR_KEY_ID,
  key_secret: process.env.YOUR_SECRET
})

router.get("/createorder", (req, res) => {
  const { amount, currency, reciept, notes } = req.body;

  razorpayInstance.orders.create(
    { amount, currency, reciept, notes },
    (err, order) => {
      if (!err) res.status(200).json(order);
      else res.status(500).send(err);
    }
  );

});


router.post('/callback', (req, res)=>{
  
})



module.exports = router;
