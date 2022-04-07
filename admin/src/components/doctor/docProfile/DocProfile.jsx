import { ArrowBack, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorContext from '../../../context/doctor/doctorContext'

import './docProfile.scss'

const DocProfile = () => {

    const { newDoctor } = useContext(doctorContext)

    const navigate = useNavigate()

    // All UseStates -------------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNo, setRegistrationNo ] = useState()
  const [password, setPassword] = useState("jankalyan");
  const [phoneNumber, setPhoneNumber] = useState();
  const [age, setAge] = useState();
  const [sex, setSex] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [govtId, setGovtId] = useState("");

    //------------------------------ File upload-------------------------------

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
          setPreview(undefined);
          return;
        }
    
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
      }, [selectedFile]);
    
      const handleFileUpload = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined);
          return;
        }
        setSelectedFile(e.target.files[0]);
      };

    //   *******************************File Upload**********************************

    const handleSubmit = async (e) => {
        e.preventDefault()
        await newDoctor(name, email, password, phoneNumber, sex, age , profilePic, govtId, registrationNo)
        navigate('/doctors')
    }

  return (
    <div className="docProfile">
    <div className="wrapper">
      <ArrowBack className="backBtn"  onClick={()=> {navigate(-1)}} />
      <div className="header">
        <h1>Add Doctor</h1>
      </div>

      <form className="container" onSubmit={handleSubmit}>
        <div className="left">
          <div className="profilePic">
            {selectedFile ? (
              <img src={preview} />
            ) : (
              <img src="/assets/defaultProfilePic.png" alt="" />
            )}
            <div className="inputContainer">
              <label htmlFor="profilePic">
                <Edit className="editIcon" />
                Add Profile Picture
              </label>
              <input
                type="file"
                id="profilePic"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          <div className="identity">
            <img src="/assets/defaultSignature.png" alt="" />
            <div className="inputContainer">
              <label htmlFor="signature">
                <Edit className="editIcon" />
                Add Identity Proof
              </label>
              <input
                type="file"
                id="signature"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileUpload}
              />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="group">
            <input
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Name</label>
          </div>

          <div className="group">
            <input
              name="email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Email</label>
          </div>

          <div className="group">
            <input
              name="registrationNo"
              type="text"
              onChange={(e) => setRegistrationNo(e.target.value)}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Doctor's Registration Number</label>
          </div>

          <div className="group">
            <input
              style={{ backgroundColor: "#e1dbdb" }}
              name="password"
              type="text"
              disabled
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Default Password</label>
          </div>

          <div className="group">
            <input
              name="phoneNumber"
              type="number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Phone Number</label>
          </div>

          <div className="ageSexLocation">
            <div className="age">
              <input
                name="age"
                placeholder="Age"
                type="number"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* <div className="location">
              <select
                required
              >
                <option defaultValue="0">Location</option>
                <option value="Guwahati">Guwahati</option>
                <option value="Borpeta">Borpeta</option>
                <option value="Other">Others</option>
              </select>
            </div> */}

            <div className="sex">
              <select
               onChange={(e) => {
                e.target.value !== "sex" && setSex(e.target.value);
              }}
                required
              >
                <option defaultValue="0">
                  Sex
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Others</option>
              </select>
            </div>
          </div>

          <Button variant="contained" type="submit" className="submitBtn">
            Create
          </Button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default DocProfile