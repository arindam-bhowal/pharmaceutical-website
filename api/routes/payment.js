const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const uniqueId = require("uniqid");

dotenv.config();

// const razorpayInstance = new Razorpay({
// key_iprocess: process.env.YOUR_KEY_ID,
// key_secret: process.env.YOUR_SECRET,
// });

const razorpayInstance = new Razorpay({
  key_id: process.env.YOUR_KEY_ID,
  key_secret: process.env.YOUR_SECRET,
});

router.post("/createorder", (req, res) => {
  razorpayInstance.orders.create(
    { amount: req.body.amount, currency: "INR" },
    (err, order) => {
      if (!err) res.status(200).json(order);
      else res.status(500).send(err);
    }
  );
});

router.post("/success", (req, res) => {
  const { validatePaymentVerification } = require("./dist/utils/razorpay-utils");
  validatePaymentVerification(
    { order_id: req.body.razorpayOrderId, payment_id: req.body.razorpayPaymentId },
    req.body.razorpaySignature,
    process.env.key_id
  );
});

module.exports = router;
