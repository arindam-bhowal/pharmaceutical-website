import axios from "axios";
import React from 'react';
import { Button, Link } from "@mui/material";
import "./register.scss";

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state={
      amount:0,
      logo: '/assets/logo.png',
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      cpassword: '',
      age: '',
      sex: '',
      location: '',
      referalId: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.openPayModal = this.openPayModal.bind(this);
  }

  componentDidMount () {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);
}

  handleChange(evt){
    console.log(evt.target.value)
    this.setState({
      amount:evt.target.value
    })
  }

  openPayModal(amt){
    var amount = amt * 100; //Razorpay consider the amount in paise

    var options = {
      "key": process.env.REACT_APP_razorpaytest_id,
      "amount": 0, // 2000 paise = INR 20, amount in paisa
      "name": "Merchant Name",
      'order_id':"",
      'image': this.state.logo,
      "handler": function(response) {
          console.log(response);
          var values ={
              razorpay_signature : response.razorpay_signature,
              razorpay_order_id : response.razorpay_order_id,
              transactionid : response.razorpay_payment_id,
              transactionamount : amount,
            }
          axios.post('http://localhost:8801/api/payment/success',values)
          .then(res=>{alert("Success")})
          .catch(e=>console.log(e))
      },
      "theme": {
        "color": "#528ff0"
      }
    };

    axios.post('http://localhost:8801/api/payment/order',{amount:amount})
    .then(res=>{
        options.order_id = res.data.id;
        options.amount = res.data.amount;
        console.log(options)
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    })
    .catch(e=>console.log(e))
    
};

  render(){
    return (
    // <div style={{paddingLeft:"500px",paddingTop:"250px"}}>
    //   Enter the amount:<input type="number" name="amount" onChange={this.handleChange}/>
    //   <button onClick={(e)=>{this.openPayModal(this.state.amount)}}>Upgrade</button>
    // </div>
    <div className="register">
    <div className="wrapper">
      <div className="leftBox">
        <div className="top">
          <div className="logo">
            <img src="/assets/logo.png" alt="" />
          </div>
        </div>
        <div className="bottom">
          <div className="heading text">
            <span>R</span>EGISTER
          </div>
          <form className="registerForm">
            <div className="group">
              <input
                type="text"
                required
                onChange={(e) => this.setState({name: e.target.value})}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Name</label>
            </div>

            <div className="group">
              <input
                type="email"
                required
                onChange={(e) => this.setState({email: e.target.value})}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email</label>
            </div>

            <div className="group">
              <input
                type="password"
                required
                onChange={(e) => this.setState({password: e.target.value})}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label> Password</label>
            </div>

            <div className="group">
              <input
                type="password"
                required
                onChange={(e) => this.setState({cpassword: e.target.value})}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Confirm Password</label>
            </div>

            <div className="group">
              <input
                type="number"
                required
                onChange={(e) => this.setState({phoneNumber: e.target.value})}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Phone Number</label>
            </div>

            <div className="ageAndSex">
              <select
                className="group sex"
                onChange={(e) => this.setState({sex: e.target.value})}
              >
                <option>Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others!</option>
              </select>

              <div className="group age">
                <input
                  type="number"
                  required
                  onChange={(e) => this.setState({age: e.target.value})}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Age</label>
              </div>
            </div>

            <div className="group">
              <select
                className="location"
                onChange={(e) => this.setState({location: e.target.value})}
              >
                <option>location</option>
                <option value="Borpeta">Borpeta</option>
                <option value="Guwahati">Guwahati</option>
                <option value="Others">Others!</option>
              </select>
            </div>

            <div className="group">
              <input
                type="text"
                required
                onChange={(e) => this.setState({referalId: e.target.value})}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Referal Id</label>
            </div>

            <div className="loginLink">
              <p>
                Already have an account?
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <span style={{ cursor: "pointer" }}> Login Now</span>
                </Link>
              </p>
            </div>

            <div className="group">
              <Button
                variant="contained"
                onClick={(e)=>{this.openPayModal(20)}}
              >
                Pay ₹20 now to register
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="rightBox">
        <img src="/assets/register.png" alt="" />
      </div>
    </div>
  </div>
  );
}
  
}

export default Register;