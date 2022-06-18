import "./payment.scss";
import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import userContext from "../../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate()
  const logo = "/assets/logo.png";
  const { fetchPatient, setReqPaymentReciept } = useContext(userContext);

  const [reqUserId, setReqUserId] = useState("");
  const [reqUser, setReqUser] = useState([]);

  const [allPayments, setAllPayments] = useState([]);

  // -----Fetching User --------------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setReqUserId(user._id);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetchPatient(reqUserId);
      setReqUser(res.data);
    };
    if (reqUserId) {
      getUser();
    }
  }, [reqUserId]);

  // -----Fetching Payments History --------------

  useEffect(() => {
    setAllPayments(reqUser.payments);
  }, [reqUser]);

  // ---------------Update Payment Status ------------------

  const updatePaymentStatus = async (date) => {
    let reqPayment = reqUser.payments.filter(payment => payment.date === date)
    reqPayment[0].status = 'success'
    let index = reqUser.payments.findIndex(payment => payment.date === date)
    reqUser.payments[index] = reqPayment[0]

    await axios.put(`http://localhost:8801/api/patient/update/${reqUserId}`, {payments : reqUser.payments})
    navigate(0)
  }

  // ------------------payments-------------------
  //  Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  //  Payment Function

  async function displayRazorpay(reqAmount, date) {
    var amount = reqAmount * 100;

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
            updatePaymentStatus(date)
          })
          .catch((e) => console.log(e));
      },
      prefill: {
        name: reqUser.name,
        email: reqUser.email,
        contact: reqUser.phoneNumber,
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
  }

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="payment">
        <div className="pendingPayments">
          <h2 className="header">Pending Payments</h2>
          <div className="wrapper">
            {allPayments === "" && (
              <>
                <span className="noPendingPayments">No Pending Payments</span>
              </>
            )}

            {allPayments &&
              allPayments.map((payment) => {
                if (payment.status === "pending") {
                  return (
                    <div key={payment.date} className="card">
                      <div className="date">
                        {new Date(payment.date).getDate() +
                          "/" +
                          new Date(payment.date).getMonth() +
                          "/" +
                          new Date(payment.date).getFullYear()}
                      </div>
                      <div className="status pending">
                        &nbsp; Pending &nbsp;
                      </div>
                      <div className="amount">₹ {payment.amount}</div>
                      <div className="payNow">
                        <Button
                          variant="contained"
                          className="btn"
                          onClick={() => {
                            displayRazorpay(payment.amount , payment.date);
                          }}
                        >
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>

        <div className="previousPayments">
          <h2 className="header">Previous Payments</h2>
          <div className="wrapper">
            {/* <span className="noPreviousPayment">
                    No payment history found
                </span> */}

            {allPayments &&
              allPayments.map((payment) => {
                if (payment.status === "success") {
                  return (
                    <div key={payment.date} className="card">
                      <div className="date">
                        {new Date(payment.date).getDate() +
                          "/" +
                          new Date(payment.date).getMonth() +
                          "/" +
                          new Date(payment.date).getFullYear()}
                      </div>
                      <div className="status paid">&nbsp; paid &nbsp;</div>
                      <div className="amount">₹ {payment.amount}</div>
                      <div className="download">
                        <Button variant="contained" className="btn" onClick={() =>{
                          setReqPaymentReciept(payment)
                           navigate('/reciept')
                        }}>
                          <Download />
                          <p>Download Invoice</p>
                        </Button>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
