import {
  ChevronRightOutlined,
  CreditCardOutlined,
  DarkModeOutlined,
  DashboardOutlined,
  GroupOutlined,
  GroupsOutlined,
  LightModeOutlined,
  LogoutOutlined,
  MedicationOutlined,
  PersonOutlineOutlined
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import "./sidebar.scss";

const Sidebar = () => {
  // All useStates
  const [isToggled, setisToggled] = useState(false);
  const [isDark, setIsDark] = useState(false);


  // For toggling button
  const handleToggle = () => {
    setisToggled(!isToggled);
  };

  return (
    <>
      <nav className={`sidebar ${!isToggled && "close"}`}>
        <header>
          <div className="image-text">
            <span className="image"><img src="/assets/logo.png" alt="" /></span>
            <div className="text logo-text">
              <span className="name">Jan-Kalyan</span>
            </div>
          </div>
          <ChevronRightOutlined
            className="bx bx-chevron-right toggle"
            onClick={handleToggle}
          />
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">

              <li className="nav-link">
                <a href="#">
                  <DashboardOutlined className="sidebar-icon" />
                  <span className="text nav-text">Dashboard</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <GroupsOutlined className="sidebar-icon" />
                  <span className="text nav-text">Patients</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <GroupOutlined className="sidebar-icon" />
                  <span className="text nav-text">Staffs</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <PersonOutlineOutlined className="sidebar-icon" />
                  <span className="text nav-text">Doctors</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <MedicationOutlined className="sidebar-icon" />
                  <span className="text nav-text">Stocks</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <CreditCardOutlined className="sidebar-icon" />
                  <span className="text nav-text">Check-out</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li className="">
              <a href="#">
                <LogoutOutlined className="sidebar-icon" />
                <span className="text nav-text">Logout</span>
              </a>
            </li>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
