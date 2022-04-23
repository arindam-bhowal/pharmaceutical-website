import { useState } from "react";
import checkoutContext from "./checkoutContext";
import axios from "axios";

const CheckoutState = (props) => {
  const host = "http://localhost:8801/api/admin";

  const [reqPatient, setReqPatient] = useState();
  const [reqStocks, setReqStocks] = useState([]);

  //   Update Payment Info Of Patient
  const updatePaymentInfo = async (patientId, payments) => {
    try {
      axios.put(`${host}/patient/update/${patientId}`, { payments });
      return "success";
    } catch (error) {
      return "error";
    }
  };

  return (
    <checkoutContext.Provider
      value={{
        reqPatient,
        setReqPatient,
        reqStocks,
        setReqStocks,
        updatePaymentInfo
      }}
    >
      {props.children}
    </checkoutContext.Provider>
  );
};

export default CheckoutState;
