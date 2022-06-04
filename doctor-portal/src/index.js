import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PatientState from "./context/patient/PatientState";
import WorkerState from "./context/worker/WorkerState";
import PharmacyState from "./context/pharmacy/PharmacyState";
import DoctorState from "./context/doctor/DoctorState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DoctorState>
      <PharmacyState>
        <WorkerState>
          <PatientState>
            <App />
          </PatientState>
        </WorkerState>
      </PharmacyState>
    </DoctorState>
  </React.StrictMode>
);
