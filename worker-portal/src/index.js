import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DoctorState from "./context/doctor/DoctorState";
import PatientState from "./context/patient/PatientState";
import PharmacyState from "./context/pharmacy/PharmacyState";
import WorkerState from "./context/worker/WorkerState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WorkerState>
      <PharmacyState>
        <PatientState>
          <DoctorState>
            <App />
          </DoctorState>
        </PatientState>
      </PharmacyState>
    </WorkerState>
  </React.StrictMode>
);
