import {
  ChevronRightOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  GroupsOutlined,
  LogoutOutlined,
  MedicationOutlined,
  PersonOutlineOutlined,
  StoreOutlined
} from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  // All useStates
  const [isToggled, setisToggled] = useState(false);


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
                <Link to="/">
                  <DashboardOutlined className="sidebar-icon" />
                  <span className="text nav-text">Dashboard</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/pharmacies">
                  <StoreOutlined className="sidebar-icon" />
                  <span className="text nav-text">Pharmacies</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/patients">
                  <GroupsOutlined className="sidebar-icon" />
                  <span className="text nav-text">Patients</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/workers">
                  <GroupOutlined className="sidebar-icon" />
                  <span className="text nav-text">Staffs</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/doctors">
                  <PersonOutlineOutlined className="sidebar-icon" />
                  <span className="text nav-text">Doctors</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/medicines">
                  <MedicationOutlined className="sidebar-icon" />
                  <span className="text nav-text">Stocks</span>
                </Link>
              </li>
              <li className="nav-link">
                <Link to="/checkout/Patient">
                  <CreditCardOutlined className="sidebar-icon" />
                  <span className="text nav-text">Check-out</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bottom-content">
            <li className="">
              <Link to="/">
                <LogoutOutlined className="sidebar-icon" />
                <span className="text nav-text">Logout</span>
              </Link>
            </li>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
