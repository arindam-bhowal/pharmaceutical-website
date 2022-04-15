import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../../context/userContext'
import './login.scss'

const Login = () => {

    const { patientLogin } = useContext(userContext)

    const navigate = useNavigate()

    // const [isChecked, setIsChecked] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const loginPatient = async() => {
            const res = await patientLogin(email, password)
            if(res==='error'){
                navigate('/error')
            }
            localStorage.setItem('user', JSON.stringify(res.data.reqPatient))
            navigate('/')
        }
        loginPatient()
    }

    return (
        <div className='login' >
            <div className="wrapper">
                <div className="leftBox" >
                    <img src="/assets/login-register.png" alt="" />
                </div>
                <div className="rightBox">
                    <div className="top">
                        <div className="logo">
                            <img src="/assets/logo.png" alt="" />
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="heading text">
                            <span>L</span>OGIN
                        </div>
                        <form className='loginForm' onSubmit={handleSubmit}>
                            <input type="email" className='inputContainer' placeholder='Email' required onChange={(e)=> {setEmail(e.target.value)}} />
                            <input type="password" className='inputContainer' placeholder='password' required onChange={(e) => setPassword(e.target.value)} />
                            {/* <div className="rememberMe">
                                <input type="checkbox" id='checkbox' onClick={(e) => console.log(e)} />
                                <span>remember me</span>
                            </div> */}
                            <button className='btn' style={{cursor: 'pointer'}}>Login</button>
                            {/* <div className="forgotPassword">
                                <p>forgot password? </p>
                            </div> */}
                            <div className="registerLink">
                                <p>Need an account? 
                                    <Link to='/register' style={{textDecoration: 'none'}}>
                                <span style={{cursor: 'pointer'}}> Register Now</span>
                                </Link>
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