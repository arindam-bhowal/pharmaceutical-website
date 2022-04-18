import "./payment.scss";
import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios'
import { useState, useEffect } from "react";

const Payment = () => {

    const logo = '/assets/logo.png'

    const [reqUser, setReqUser] = useState([])

    const [amount, setAmount] = useState(100)


  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }


  async function displayRazorpay(reqAmount) {

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post("http://localhost:8801/api/payment/createorder", { amount: reqAmount });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.REACT_APP_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "JAN-KALYAN HEALTHCARE",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:5000/api/payment/success",
          data
        );

        alert(result.data.msg);
      },
      prefill: {
        name: reqUser.name,
        email: reqUser.email,
        contact: reqUser.phoneNumber,
      },
      notes: {
        address: reqUser.location,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('user'))
    setReqUser(res)
  }, [])
  

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="payment">
        <div className="pendingPayments">
          <h2 className="header">Pending Payments</h2>
          <div className="wrapper">
            {/* <span className="noPendingPayments">
                      No Pending Payments
                  </span> */}

            <div className="card">
              <div className="date">26th March 2022</div>
              <div className="status pending">&nbsp; Pending &nbsp;</div>
              <div className="amount">₹ 200</div>
              <div className="payNow">
                <Button
                  variant="contained"
                  className="btn"
                  onClick={()=>{displayRazorpay(amount)}}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="previousPayments">
          <h2 className="header">Previous Payments</h2>
          <div className="wrapper">
            {/* <span className="noPreviousPayment">
                    No payment history found
                </span> */}

            <div className="card">
              <div className="date">26th March 2022</div>
              <div className="status paid">&nbsp; paid &nbsp;</div>
              <div className="amount">₹ 200</div>
              <div className="download">
                <Button variant="contained" className="btn">
                  <Download />
                  <p>Download Invoice</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
