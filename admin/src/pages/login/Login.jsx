import "./login.scss";

const Login = () => {
    
  return (
    <div className="login">
      <div className="container">
        <form action="" className="form">
          <span className="top-text">Login</span>
          <input type="text" placeholder="Username" className="username" />
          <input type="password" placeholder="Password" className="password" />
          <input type="submit" className="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
