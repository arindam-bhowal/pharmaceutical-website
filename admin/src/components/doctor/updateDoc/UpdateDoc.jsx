import './updateDoc.scss'
import { ArrowBack, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import doctorContext from "../../../context/doctor/doctorContext";


const UpdateDoc = () => {

    const { updateDoctor, getDoctor} = useContext(doctorContext)

    const { doctorId } = useParams()
    const navigate = useNavigate();

    const [reqDoc, setReqDoc] = useState()

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

   // --------useStates and useEffects -----------

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
 
   // ---------------------*******************---------------------------------------

   // Get patient details 
  useEffect(() => {
    const fetchDoctor = async () => {
     const res = await getDoctor(doctorId)
      if(res==='error'){
        navigate('/error')
      }
      setReqDoc(res)
      console.log(res)
    }
    fetchDoctor()
  }, [getDoctor, doctorContext])

  useEffect(() => {
    if(reqDoc){
      setName(reqDoc.name)
      setEmail(reqDoc.email)
      setRegistrationNo(reqDoc.registrationNo)
      setPhoneNumber(reqDoc.phoneNumber)
      setAge(reqDoc.age)
      setSex(reqDoc.sex)
      setProfilePic(reqDoc.profilePic)
      setGovtId(reqDoc.govtId)
    }
  }, [reqDoc])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoctor(doctorId,  name, email, phoneNumber, sex, age , profilePic, govtId, registrationNo)
    navigate("/doctors");
  };


  return (
    <div className="updateDoc">
      <div className="wrapper">
        <ArrowBack
          className="backBtn"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="header">
          <h1>Update Doctor Details</h1>
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
              defaultValue={reqDoc && reqDoc.name}
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
              defaultValue={reqDoc && reqDoc.email}
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
              defaultValue={reqDoc && reqDoc.registrationNo}
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
              defaultValue={reqDoc && reqDoc.phoneNumber}
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
                defaultValue={reqDoc && reqDoc.age}
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
            Update
          </Button>
        </div>
      </form>

      </div>
    </div>
  )
}

export default UpdateDoc