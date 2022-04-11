import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import CheckoutState from "./context/checkout/CheckoutState";
import DoctorState from "./context/doctor/DoctorState";
import MedicineState from "./context/medicine/MedicineState";
import PatientState from "./context/patient/PatientState";
import WorkerState from "./context/worker/WorkerState";

ReactDOM.render(
  <React.StrictMode>
    <MedicineState>
      <WorkerState>
        <PatientState>
          <DoctorState>
            <CheckoutState >
            <App />
            </CheckoutState>
          </DoctorState>
        </PatientState>
      </WorkerState>
    </MedicineState>
  </React.StrictMode>,
  document.getElementById("root")
);
