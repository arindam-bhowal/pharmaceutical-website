import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MedicineState from "./context/medicine/MedicineState";
import PatientState from "./context/patient/PatientState";

ReactDOM.render(
  <React.StrictMode>
    <MedicineState>
    <PatientState>
      <App />
    </PatientState>
    </MedicineState>
  </React.StrictMode>,
  document.getElementById("root")
);
