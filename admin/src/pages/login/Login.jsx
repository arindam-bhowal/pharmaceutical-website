import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    if(username==='janKalyan' && password==='janKalyan'){
      localStorage.setItem('admin', {user: username})
      navigate('/')
    }
  }
    
  return (
    <div className="login">
      <div className="container" onSubmit={handleSubmit}>
        <form action="" className="form">
          <span className="top-text">Login</span>
          <input type="text" placeholder="Username" className="username" onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="password" onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" className="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
