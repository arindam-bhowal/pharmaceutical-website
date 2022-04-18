import { Button, Link } from "@mui/material";
import "./register.scss";
import axios from "axios";
import { useState } from "react";

const Register = () => {

  const logo = '/assets/logo.png'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState()
  const [location, setLocation] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [age, setAge] = useState()
  const [sex, setSex] = useState('')
  const [referalId, setReferalId] = useState('')


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
        name: name,
        email: email,
        contact: phoneNumber,
      },
      notes: {
        address: location,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }



  return (
    <div className="register">
      <div className="wrapper">
        <div className="leftBox">
          <div className="top">
            <div className="logo">
              <img src="/assets/logo.png" alt="" />
            </div>
          </div>
          <div className="bottom">
            <div className="heading text">
              <span>R</span>EGISTER
            </div>
            <form className="registerForm">
              <div className="group">
                <input type="text" required onChange={(e) => setName(e.target.value)} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Name</label>
              </div>

              <div className="group">
                <input type="email" required onChange={e => setEmail(e.target.value)} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Email</label>
              </div>

              <div className="group">
                <input type="password" required onChange={e => setPassword(e.target.value)} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label> Password</label>
              </div>

              <div className="group">
                <input type="password" required onChange={e => setConfirmPassword(e.target.value)} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Confirm Password</label>
              </div>

              <div className="group">
                <input type="number" required onChange={e => setPhoneNumber(e.target.value)} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Phone Number</label>
              </div>

              <div className="ageAndSex">
                <select className="group sex" onChange={e => setSex(e.target.value)}>
                  <option>Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>  
                  <option value="Others">Others!</option>
                </select>

                <div className="group age">
                  <input type="number" required onChange={e => setAge(e.target.value)} />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Age</label>
                </div>
              </div>

              <div className="group">
                <select className="location" onChange={e => setLocation(e.target.value)}>
                  <option>location</option>
                  <option value="Borpeta">Borpeta</option>
                  <option value="Guwahati">Guwahati</option>
                  <option value="Others">Others!</option>
                </select>
              </div>

              <div className="group">
                <input type="text" required onChange={e => setReferalId(e.target.value)} />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Referal Id</label>
              </div>

              <div className="loginLink">
                <p>
                  Already have an account?
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <span style={{ cursor: "pointer" }}> Login Now</span>
                  </Link>
                </p>
              </div>

              <div className="group">
                <Button variant="contained" onClick={()=>{displayRazorpay(2000)}}>Pay ₹20 now to register</Button>
              </div>
            </form>
          </div>
        </div>

        <div className="rightBox">
          <img src="/assets/register.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
