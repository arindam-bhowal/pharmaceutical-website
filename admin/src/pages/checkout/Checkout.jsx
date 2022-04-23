import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import checkoutContext from "../../context/checkout/checkoutContext";
import medicineContext from "../../context/medicine/medicineContext";
import patientContext from "../../context/patient/patientContext";
import "./checkout.scss";

const Checkout = () => {
  const navigate = useNavigate();
  const { reqPatient, reqStocks, updatePaymentInfo } =
    useContext(checkoutContext);

  const { getPatient } = useContext(patientContext);
  const [patient, setPatient] = useState([]);

  const { fetchAllMedicines } = useContext(medicineContext);
  const [cartStocks, setCartStocks] = useState([]);
  const [netPrice, setNetPrice] = useState(0);

  //  ================ Warn Before Reloading====================
  useBeforeunload((event) => {
    if (reqStocks !== "" && reqPatient !== "") {
      event.preventDefault();
    }
  });

  // ===================  Get All Medicine =====================

  const getStocks = async () => {
    const AllMedicines = await fetchAllMedicines();
    let common = [];
    AllMedicines.forEach((med) => {
      reqStocks.forEach((stock) => {
        if (med._id === stock.stockId) {
          med.quantity = stock.quantity;
          common.push(med);
        }
      });
    });
    setCartStocks([...common]);
  };

  // ====================== Display Net Amount=================

  const calculateTotalAmount = () => {
    let total = cartStocks.reduce((amount, stock) => {
      return amount + stock.sellingPrice * stock.quantity;
    }, 0);
    setNetPrice(total);
  };

  //  ========= Get Patient, Stocks and Net Amount ============

  useEffect(() => {
    const fetchPatient = async () => {
      if (reqPatient) {
        const res = await getPatient(reqPatient);
        setPatient(res);
      } else {
        navigate("/checkout/patient");
      }
    };

    fetchPatient();
    getStocks();
    calculateTotalAmount();
  }, [reqPatient, cartStocks]);

  //  ===============Handle Payments ==========================

  const handlePayment = async (status) => {
    let newArray = patient.payments
    newArray.push({amount: netPrice, status: status , date: new Date()})
    try {
      const res = await updatePaymentInfo(patient._id, newArray)
      if(res==='error'){
        navigate('error')
      }
      status==='success' ? alert('Patient has paid successfully!!. The reciept has been sent to his account') : alert('A request has been been sent to user account to pay!!')
      navigate('/')
    } catch (error) {
      navigate('/error')
    }
  }

  return (
    <>
      <Sidebar />
      <div className="checkout">
        <div className="top">
          <div className="left">
            <div className="heading">
              <h1>Patient Details</h1>
            </div>
            <div className="details">
              <h4>{patient ? patient.name : "Patient Name"}</h4>
              <h5>{patient ? patient.email : "email not defined"}</h5>
              <h6>
                {patient ? patient.phoneNumber : "Phone Number not defined"}
              </h6>
            </div>
          </div>

          <div className="right">
            <div className="price">
              <span style={{ fontSize: "2em" }}>Net Price: </span>
              <span
                className="netAmount"
                style={{ fontSize: "3em", margin: "10px" }}
              >
                {" "}
                ₹{netPrice}
              </span>
            </div>
            <div className="buyButton">
              <Button
                variant="contained"
                color="success"
                size="large"
                className="btn"
                onClick={() => handlePayment("success")}
              >
                Paid successfully
              </Button>
              <Button
                variant="contained"
                color="success"
                size="large"
                className="btn"
                onClick={() => handlePayment("pending")}
              >
                Request Patient to Pay
              </Button>
            </div>
          </div>
        </div>
        <hr />

        <div className="bottom">
          <h2 style={{ color: "rgb(9, 128, 128)", textAlign: "center" }}>
            Select Quantity
          </h2>
          <div className="wrapper">
            {cartStocks.map((med) => (
              <div className="checkoutCard" key={med._id}>
                <div className="checkoutCardLeft">
                  <h3>{med.drugName}</h3>
                  <h4>{med.manufacturer}</h4>
                  <h5>Price : ₹{med.sellingPrice}</h5>
                </div>
                <div className="checkoutCardRight">
                  <div className="amount">
                    <span className="status remove">Quantity: </span>
                    <span className="status add">{med.quantity}</span>
                  </div>
                  <div className="cardPrice">
                    ₹ <span>{med.quantity * med.sellingPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="right">
            <div className="price">
              <span style={{ fontSize: "2em" }}>Net Price: </span>
              <span className="netAmount"> ₹ 
              { netPrice  }
              </span>
            </div>
            <div className="buyButton">
              <Button variant="contained" color="success" size="large" className='btn'>
                Paid successfully
              </Button>
              <Button variant="contained" color="success" size="large" className="btn">
                Request Patient to Pay
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Checkout;
