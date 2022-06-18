import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import PharmacyState from "./context/pharmacy/PharmacyState";
import UserState from "./context/UserState";

ReactDOM.render(
  <React.StrictMode>
    <UserState>
      <PharmacyState>
        <App />
      </PharmacyState>
    </UserState>
  </React.StrictMode>,
  document.getElementById("root")
);
