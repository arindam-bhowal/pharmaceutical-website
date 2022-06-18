import "./reciept.scss";
import { Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import userContext from "../../context/userContext";
import { useBeforeunload } from "react-beforeunload";
import { useNavigate } from "react-router-dom";

const Reciept = () => {
  const { fetchPatient, reqPaymentReciept } = useContext(userContext);
  const [reqUserId, setReqUserId] = useState("");
  const [reqUser, setReqUser] = useState([]);

  const navigate = useNavigate();

  //  ================ Warn Before Reloading====================
  useBeforeunload((event) => {
    if (reqPaymentReciept) {
      event.preventDefault();
    }
  });

  useEffect(() => {
    reqPaymentReciept===undefined && navigate('/payments')
  }, [reqPaymentReciept])
  

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
  return (
    <>
      <div className="reciept">
        <div className="top">
          <div className="left">
            <div className="heading">
              <h1>Patient Details</h1>
            </div>
            <div className="details">
              <h4>{reqUser ? reqUser.name : "Patient Name"}</h4>
              <h5>{reqUser ? reqUser.email : "email not defined"}</h5>
              <h5>
                {reqUser ? reqUser.phoneNumber : "Phone Number not defined"}
              </h5>
              <h4>
                Date:{" "}
                {reqPaymentReciept &&
                  new Date(reqPaymentReciept.date).toUTCString()}
              </h4>
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
                ₹{reqPaymentReciept && reqPaymentReciept.amount}
              </span>
            </div>
            <div className="buyButton">
              <Button
                variant="contained"
                color="success"
                size="large"
                className="btn"
                onClick={() => window.print()}
              >
                Print
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
            {reqPaymentReciept &&
              reqPaymentReciept.stocks &&
              reqPaymentReciept.stocks.map((med) => (
                <div className="checkoutCard">
                  <div className="checkoutCardLeft">
                    <h3>{med.drugName}</h3>
                    {/* <h4>{med.manufacturer}</h4> */}
                    {/* <h5>Price : ₹{med.sellingPrice}</h5> */}
                  </div>
                  <div className="checkoutCardRight">
                    <div className="amount">
                      <span className="status remove">Quantity: </span>
                      <span className="status add">{med.quantity}</span>
                    </div>
                    {/* <div className="cardPrice">
                    ₹{" "}
                    <span>
                      {med.reqQuantity *
                        ((med.sellingPrice * (100 - med.discount)) / 100)}
                    </span>
                  </div> */}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reciept;
