import {
  AlternateEmail,
  Call,
  DateRange,
  Key,
  LockOpen,
  PersonOutline,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import "./register.scss";
import referralCodeGenerator from "referral-code-generator";
import { useNavigate } from "react-router-dom";
import workerContext from "../../context/worker/workerContext";

const Register = () => {
  const navigate = useNavigate()

  const { registerWorker } = useContext(workerContext)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [referalId, setReferalId] = useState('')
  const [registrationNo, setRegistrationNo] = useState('')
  const percentPerReferal = 2;
  const referals = [];
  const profilePic = "";
  const govtId = "";

  //  generating referalId

  useEffect(() => {
    let code = referralCodeGenerator.custom("lowercase", 4, 6, name);
    setReferalId(code);
    console.log(code)
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault()
    const register = async () => {
      const res = await registerWorker(name, email, password, phoneNumber, sex, age , profilePic, govtId, registrationNo, referals,referalId, percentPerReferal) 
      if(res==='error'){
        navigate('/error')
      }
      navigate('/login')
    }
    password === cPassword && register()
  };

  return (
    <div className="register">
      <div className="form_wrapper">
        <div className="form_container">
          <div className="title_container">
            <h2>Responsive Registration Form</h2>
          </div>
          <div className="row clearfix">
            <div className>
              <form onSubmit={handleSubmit}>
                <div className="input_field">
                  {" "}
                  <span>
                    <AlternateEmail className="icon" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <Key className="icon" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="input_field">
                  {" "}
                  <span>
                    <LockOpen className="icon" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Re-type Password"
                    required
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                </div>

                <div className="input_field">
                  {" "}
                  <span>
                    <PersonOutline className="icon" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="input_field">
                  {" "}
                  <span>
                    <Call className="icon" />
                  </span>
                  <input
                    type="number"
                    name="name"
                    placeholder="Phone Number"
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="input_field">
                  {" "}
                  <span>
                    <Call className="icon" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Registration Number"
                    required
                    onChange={(e) => setRegistrationNo(e.target.value)}
                  />
                </div>


                {/* <div className="input_field">
                {" "}
                <span>
                  <CreditCard className="icon" />
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Doctor Registration Number"
                  required
                  // onChange={(e) => setRegistrationNo(e.target.value)}
                />
              </div> */}

                <div style={{ margin: "20px" }}>
                  <label htmlFor="sex" style={{ margin: "20px" }}>
                    SEX :{" "}
                  </label>
                  <select
                    id="sex"
                    onChange={(e) => {
                      e.target.value !== "" && setSex(e.target.value);
                    }}
                  >
                    <option value="">Select Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="input_field">
                  {" "}
                  <span>
                    <DateRange className="icon" />
                  </span>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    required
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                {/* <div className="input_field select_option">
                <select>
                  <option>Select a country</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <div className="select_arrow" />
              </div> */}
                <div className="input_field checkbox_option">
                  <input type="checkbox" id="cb1" />
                  <label htmlFor="cb1">I agree with terms and conditions</label>
                </div>
                <input
                  className="button"
                  type="submit"
                  defaultValue="Register"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
