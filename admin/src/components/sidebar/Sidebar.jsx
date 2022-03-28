import React from 'react'
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import MedicationIcon from "@mui/icons-material/Medication";
import './sidebar.scss'
const Sidebar = () => {
    return (
      <div className="s-layout">
        <div className="s-layout__sidebar">
          <a className="s-sidebar__trigger" href="#0">
            <i className="fa fa-bars"></i>
          </a>

          <nav className="s-sidebar__nav">
            <ul>
              <li>
                <a className="s-sidebar__nav-link" href="#0">
                  {/* <DashboardIcon/> */}
                  <em>Dashboard</em>
                </a>
              </li>
              <li>
                <a className="s-sidebar__nav-link" href="#0">
                  {/* <MedicationIcon /> */}
                  <em>Doctor</em>
                </a>
              </li>
              <li>
                <a className="s-sidebar__nav-link" href="#0">
                  <i className="fa fa-camera"></i>
                  <em>Paitent</em>
                </a>
              </li>
              <li>
                <a className="s-sidebar__nav-link" href="#0">
                  <i className="fa fa-camera"></i>
                  <em>Staff</em>
                </a>
              </li>
              <li>
                <a className="s-sidebar__nav-link" href="#0">
                  <i className="fa fa-camera"></i>
                  <em>Stock</em>
                </a>
              </li>
              <li>
                <a className="s-sidebar__nav-link" href="#0">
                  <i className="fa fa-camera"></i>
                  <em>Checkout</em>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
}

export default Sidebar