import './navbar.scss'
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <div className='navbar'>
      <nav className="stroke">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/appointment">Appointments</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/payments">Payment History</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><a style={{cursor: 'pointer'}} onClick={()=>{
            localStorage.removeItem('user')
            navigate('/login')
          }} >Logout</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar