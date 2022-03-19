import './login.scss'

const Login = () => {
    return (
        <div className='login' >
            <div className="wrapper">
                <div className="rightBox" >
                    <img src="/assets/login-register.png" alt="" />
                </div>
                <div className="leftBox">
                    <div className="top">
                        <div className="logo">
                            <img src="/assets/logo.png" alt="" />
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="heading text">
                            <span>L</span>OGIN
                        </div>
                        <form className='loginForm'>
                            <input type="email" className='inputContainer' placeholder='Email' />
                            <input type="password" className='inputContainer' placeholder='password' />
                            <div className="rememberMe">
                                <input type="checkbox" id='checkbox'/>
                                <span>remember me</span>
                            </div>
                            <button className='btn'>Login</button>
                            <div className="forgotPassword">
                                <p>forgot password? </p>
                            </div>
                            <div className="registerLink">
                                <p>Need an account? 
                                <span> Register Now</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login