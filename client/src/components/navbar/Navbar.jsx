import './navbar.scss'

const Navbar = () => {
  return (
    <div className='navbar'>
      <nav className="stroke">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Appointments</a></li>
          <li><a href="#">History</a></li>
          <li><a href="#">Lab Tests</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar