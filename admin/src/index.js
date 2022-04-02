import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PatientState from "./context/patient/PatientState";

ReactDOM.render(
  <React.StrictMode>
    <PatientState>
      <App />
    </PatientState>
  </React.StrictMode>,
  document.getElementById("root")
);
