import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import checkoutContext from "../../context/checkout/checkoutContext";
import medicineContext from "../../context/medicine/medicineContext";
import patientContext from "../../context/patient/patientContext";
import axios from "axios";
import "./checkout.scss";

const Checkout = () => {
  const navigate = useNavigate();
  const { reqPatient, reqStocks, updatePaymentInfo } =
    useContext(checkoutContext);

  const { getPatient } = useContext(patientContext);
  const [patient, setPatient] = useState([]);

  const { fetchAllMedicines } = useContext(medicineContext);
  const [cartStocks, setCartStocks] = useState([]);
  // const [netPrice, setNetPrice] = useState(0);

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
          med.reqQuantity = stock.quantity;
          common.push(med);
        }
      });
    });
    setCartStocks([...common]);
  };

  // ====================== Display Net Amount=================

  // useEffect(() => {
  //   const calculateTotalAmount = async () => {
  //     let total = await cartStocks.reduce((amount, stock) => {
  //       return (
  //         amount +
  //         stock.reqQuantity *
  //           ((stock.sellingPrice * (100 - stock.discount)) / 100)
  //       );
  //     }, 0);
  //     setNetPrice(total);
  //   };
  //   calculateTotalAmount();
  // }, [netPrice]);

  //  ========= Get Patient, Stocks============

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
  }, [reqPatient]);

  //  ===============Handle Payments ==========================

  const handlePayment = async (status) => {
    let total = await cartStocks.reduce((amount, stock) => {
      return (
        amount +
        stock.reqQuantity *
          ((stock.sellingPrice * (100 - stock.discount)) / 100)
      );
    }, 0);
    
    let newArray = patient.payments;
    newArray.push({
      amount: total,
      status: status,
      stocks: reqStocks,
      date: new Date().toUTCString(),
    });
    try {
      const res = await updatePaymentInfo(patient._id, newArray);

      cartStocks.map(async (stock) => {
        await axios.put(
          `http://localhost:8801/api/admin/medicine/update/${stock._id}`,
          { quantity: stock.quantity - stock.reqQuantity }
        );
      });

      if (res === "error") {
        navigate("error");
      }
      status === "success"
        ? alert(
            "Patient has paid successfully!!. The reciept has been sent to his account"
          )
        : alert("A request has been been sent to user account to pay!!");
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

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
                ₹{
                  cartStocks.reduce((amount, stock) => {
                    return (
                      amount +
                      stock.reqQuantity *
                        ((stock.sellingPrice * (100 - stock.discount)) / 100)
                    );
                  }, 0)
                }
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
            Medicine Details
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
                    <span className="status add">{med.reqQuantity}</span>
                  </div>
                  <div className="cardPrice">
                    ₹{" "}
                    <span>
                      {med.reqQuantity *
                        ((med.sellingPrice * (100 - med.discount)) / 100)}
                    </span>
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
