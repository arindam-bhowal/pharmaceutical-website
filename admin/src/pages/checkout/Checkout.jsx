import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import checkoutContext from "../../context/checkout/checkoutContext";
import medicineContext from "../../context/medicine/medicineContext";
import patientContext from "../../context/patient/patientContext";
import "./checkout.scss";

const Checkout = () => {
  const { reqPatient, reqStocks } = useContext(checkoutContext);

  const { getPatient } = useContext(patientContext);

  const { fetchAllMedicines } = useContext(medicineContext)

  const [patient, setPatient] = useState([]);

  const [cartStocks, setCartStocks] = useState([])

  const [netPrice, setNetPrice] = useState(0)

  useEffect(() => {
    const fetchPatient = async () => {
      const res = await getPatient(reqPatient);
      setPatient(res);
    };
    fetchPatient();

    getStocks()

    calculateTotalAmount()

  }, [reqPatient]);

  const getStocks = async () => {
      const AllMedicines = await fetchAllMedicines()
      let common = []
      AllMedicines.forEach(med => {
          reqStocks.forEach(stock => {
              if(med._id === stock.stockId){
                  med.quantity = stock.quantity
                  common.push(med)
              }
          })
      })
      setCartStocks([...common])
  }

  const calculateTotalAmount = () => {
      let amount = 0
      cartStocks.forEach(med=> {
          amount += med.sellingPrice*med.quantity
      })
      setNetPrice(amount)
  }


  return (
    <>
      <Sidebar />
      <div className="checkout">
        <div className="top">
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
        <hr />

        <div className="bottom">
          <div className="left">
            <h2 style={{ color: "rgb(9, 128, 128)", textAlign: "center" }}>
              Select Quantity
            </h2>
            <div className="wrapper">

                {
                    cartStocks.map(med => 
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
                        )
                }

       
                  {/* <div className="checkoutCard">
                    <div className="checkoutCardLeft">
                      <h3>medicine.drugName</h3>
                      <h4>Medicine Details</h4>
                      <h5>medicine.sellingPrice</h5>
                    </div>
                    <div className="checkoutCardRight">
                      <div className="amount">
                        <span className="status remove">Quantity: </span>
                        <span className="status add">2</span>
                      </div>
                      <div className="cardPrice">
                        ₹ <span>2323</span>
                      </div>
                    </div>
                  </div> */}
              

            </div>
          </div>

          <div className="right">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
