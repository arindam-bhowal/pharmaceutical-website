import {
  BadgeOutlined,
  ChevronRightOutlined,
  DashboardOutlined,
  EditOutlined,
  GroupOutlined,
  GroupsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();

  // All useStates
  const [isToggled, setisToggled] = useState(false);

  // For toggling button
  const handleToggle = () => {
    setisToggled(!isToggled);
  };

  //  For logout
  const handleLogout = () => {
    localStorage.removeItem("doc");
    navigate("/login");
  };

  return (
    <>
      <nav className={`sidebar ${!isToggled && "close"}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="/assets/logo.png" alt="" />
            </span>
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
                <Link to="/doctorId">
                  <BadgeOutlined className="sidebar-icon" />
                  <span className="text nav-text">Id Card</span>
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
                <Link to="/editprofile">
                  <EditOutlined className="sidebar-icon" />
                  <span className="text nav-text">Edit Profile</span>
                </Link>
              </li>
              {/* <li className="nav-link">
                <Link to="/doctors">
                  <PersonOutlineOutlined className="sidebar-icon" />
                  <span className="text nav-text">Doctors</span>
                </Link>
              </li> */}
              {/* <li className="nav-link">
                <Link to="/medicines">
                  <MedicationOutlined className="sidebar-icon" />
                  <span className="text nav-text">Stocks</span>
                </Link>
              </li> */}
              {/* <li className="nav-link">
                <Link to="/checkout/Patient">
                  <CreditCardOutlined className="sidebar-icon" />
                  <span className="text nav-text">Check-out</span>
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="bottom-content">
            <li className="">
              <Button className="btn" onClick={handleLogout}>
                <LogoutOutlined className="sidebar-icon" />
                <span className="text nav-text">Logout</span>
              </Button>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
