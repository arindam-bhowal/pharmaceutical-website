import { ArrowBack, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import patientContext from "../../context/patient/patientContext";
import "./profile.scss";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();

  const { newPatient } = useContext(patientContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("jankalyan");
  const [phoneNumber, setPhoneNumber] = useState();
  const [age, setAge] = useState();
  const [location, setLocation] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newPatient(name, email, password,phoneNumber,sex,age,profilePic,govtId,location);
    navigate('/patients')
  };

  return (
    <div className="profile">
      <div className="wrapper">
        <ArrowBack className="backBtn"  onClick={()=> {navigate(-1)}} />
        <div className="header">
          <h1>Add a Patient</h1>
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
                required
                onChange={(e) => setName(e.target.value)}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Name</label>
            </div>

            <div className="group">
              <input
                name="email"
                type="text"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Email</label>
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
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
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

              <div className="location">
                <select
                  onChange={(e) => {
                    e.target.value !== "location" &&
                      setLocation(e.target.value);
                  }}
                  required
                >
                  <option defaultValue="0">Location</option>
                  <option value="Guwahati">Guwahati</option>
                  <option value="Borpeta">Borpeta</option>
                  <option value="Other">Others</option>
                </select>
              </div>

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
  );
};

export default Profile;
