import './navbar.scss'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='navbar'>
      <nav className="stroke">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/appointment">Appointments</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/report">Lab Tests</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar