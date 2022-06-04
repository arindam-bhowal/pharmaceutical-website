import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import doctorContext from '../../context/doctor/doctorContext';
import './login.scss'

const Login = () => {
  const navigate = useNavigate()

  const { loginDoctor } = useContext(doctorContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const login = async () => {
      const res = await loginDoctor(email, password)
      localStorage.setItem('doc', JSON.stringify(res.data.otherInfo))
      if(res==='error'){
        navigate('error')
      }
      navigate('/')
    }
    login()
  }

  useEffect(() => {
    localStorage.getItem('doc') && navigate('/')
  }, [])
  

  return (
    <div className="login">
      <div className="login-form">
        <div className="indent-a" />
        <div className="indent-b" />
        <div className="form-header">
          <div className="logo-wrapper">
            <img src="/assets/logo.png" alt='' />
          </div>
          <h2>Welcome Back</h2>
          <h4>Please login to continue</h4>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <input id="username" placeholder="Email" className="form-field" onChange={(e) => setEmail(e.target.value)} />
          <input
            id="userpassword"
            type="password"
            placeholder="Password"
            className="form-field"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="form-submit" type="submit">
            Login
          </button>
        </form>
        <Link to="/register" className="forgot-link">
          Do not have an account ? Register Now
        </Link>
      </div>
    </div>
  );
};

export default Login;
