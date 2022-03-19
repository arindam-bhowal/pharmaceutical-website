import './register.scss'

const Register = () => {
  return (
    <div className='register'>
      <div className="wrapper">
        <div className="rightBox">
          <div className="top">
            <div className="logo">
              <img src="/assets/logo.png" alt="" />
            </div>
          </div>
          <div className="bottom">
            <div className="heading text">
              <span>R</span>EGISTER
            </div>
            <form className='loginForm'>
              <input type="text" className='inputContainer' placeholder='Name' />
              <input type="email" className='inputContainer' placeholder='Email' />
              <input type="number" className='inputContainer' placeholder='Phone Number' />
              <div className="inputContainerBox">
                <div className="sex">
                  <label htmlFor="sex">Sex</label>
                  <select id="sex">
                    <option value="male" >Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="age">
                  <label htmlFor="age">Age</label>
                  <input type="number" />
                </div>
              </div>
              <textarea className='inputContainer' id='addressInput' cols="10" rows="10" placeholder='Address'></textarea>
              <input type="password" className='inputContainer' placeholder='password' />
              <div className="termsAndConditions">
                <input type="checkbox" id='checkbox' />
                <p>I agree to the </p>
                <span>&nbsp;terms & conditions </span>
              </div>
              <button className='btn'>Register</button>
              <div className="loginLink">
                <p>Already have an account?
                  <span> Login Now</span>
                </p>
              </div>
            </form>
          </div>
        </div>


        <div className="leftBox">
          <img src="/assets/register.png" alt="" />
        </div>

      </div>
    </div>
  )
}

export default Register