import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Link } from "@mui/material";
import "./register.scss";
import { useNavigate } from "react-router";
import pharmacyContext from "../../context/pharmacy/pharmacyContext";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [location, setLocation] = useState("");
  const [referedBy, setReferedBy] = useState("");

  const { fetchAllPharmacies } = useContext(pharmacyContext);
  const [locationOptions, setLocationOptions] = useState([]);

  // ----------------Location -----------------

  useEffect(() => {
    const getAllLocations = async () => {
      const res = await fetchAllPharmacies();
      setLocationOptions(res);
    };
    getAllLocations();
  }, []);

  // ---------------Regiatering New Patient -------------
  const registerPatient = async () => {
    await axios
      .post("http://localhost:8801/api/patient/register", {
        name,
        email,
        phoneNumber,
        password,
        age,
        sex,
        location,
        referedBy,
      })
      .catch((err) => {
        alert(err.response.data.msg);
        navigate(0);
      });

    navigate("/login");
  };

  const logo = "/assets/logo.png";
  let amount = 0;

  //  Script for Razor Pay

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cpassword !== password) {
      alert("Password did not match!!");
      navigate(0);
    }

    // Payment Process
    var amount = 20 * 100;

    var options = {
      key: process.env.REACT_APP_razorpaytest_id,
      amount: 0,
      name: "JanKalyan",
      order_id: "",
      image: logo,
      handler: function (response) {
        var values = {
          razorpay_signature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          transactionid: response.razorpay_payment_id,
          transactionamount: amount,
        };
        axios
          .post("http://localhost:8801/api/payment/success", values)
          .then((res) => {
            // console.log(res);
            alert("Success");
            // Patient Registered
            registerPatient();
          })
          .catch((e) => console.log(e));
      },
      prefill: {
        name: name,
        email: email,
        contact: phoneNumber,
      },
      theme: {
        color: "#528ff0",
      },
    };

    axios
      .post("http://localhost:8801/api/payment/order", { amount: amount })
      .then((res) => {
        options.order_id = res.data.id;
        options.amount = res.data.amount;
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((e) => console.log(e));
  };

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
            <form className="registerForm" onSubmit={handleSubmit}>
              <div className="group">
                <input
                  type="text"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Name</label>
              </div>

              <div className="group">
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Email (Unique Email Only)</label>
              </div>

              <div className="group">
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label> Password</label>
              </div>

              <div className="group">
                <input
                  type="password"
                  required
                  onChange={(e) => setCpassword(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Confirm Password</label>
              </div>

              <div className="group">
                <input
                  type="number"
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Phone Number</label>
              </div>

              <div className="ageAndSex">
                <select
                  className="group sex"
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option>Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others!</option>
                </select>

                <div className="group age">
                  <input
                    type="number"
                    required
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Age</label>
                </div>
              </div>

              <div className="group">
                <select
                  onChange={(e) => {
                    e.target.value !== "location" &&
                      setLocation(e.target.value);
                  }}
                  required
                >
                  <option value="Location">Location</option>
                  {locationOptions.map((option) => (
                    <option key={option.drugLicenseNo} value={option.branch}>
                      {option.branch}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group">
                <input
                  type="text"
                  onChange={(e) => setReferedBy(e.target.value)}
                />
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
                <Button
                  type="submit"
                  variant="contained"
                  // onClick={(e) => {
                  //   // this.openPayModal(20);
                  // }}
                >
                  Pay ₹20 now to register
                </Button>
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
