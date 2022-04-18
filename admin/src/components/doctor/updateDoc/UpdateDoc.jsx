import './updateDoc.scss'
import { ArrowBack, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import doctorContext from "../../../context/doctor/doctorContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
 } from "firebase/storage";
 import app from "../../../firebase";


const UpdateDoc = () => {

    const { updateDoctor, getDoctor} = useContext(doctorContext)

    const { doctorId } = useParams()
    const navigate = useNavigate();

    const [reqDoc, setReqDoc] = useState()

        // All UseStates -------------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNo, setRegistrationNo ] = useState()
  const password = 'janKalyan'
  const [phoneNumber, setPhoneNumber] = useState();
  const [age, setAge] = useState();
  const [sex, setSex] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [govtId, setGovtId] = useState("");

  const [progressUpload, setProgressUpload] = useState();


  const options = [
    {
      label: "Sex",
      value: "Sex",
      isDisabed: true
    },
    {
      label: "Male",
      value: "Male",
      isDisabed: false
    },
    {
      label: "Female",
      value: "Female",
      isDisabed: false
    },
    {
      label: "Others",
      value: "Others",
      isDisabed: false
    }
  ];
// --------------------------------------------------Profile Pic Upload -------------------------------------------

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

// --------------------------------------------------Profile Pic Upload -------------------------------------------


//  -----------------------------------------------------Id Proof Upload ------------------------------------------------
const [selectedIdProof, setSelectedIdProof] = useState();
const [IdPreview, setIdPreview] = useState();

useEffect(() => {
if (!selectedIdProof) {
  setIdPreview(undefined);
  return;
}

const previewUrl = URL.createObjectURL(selectedIdProof);
setIdPreview(previewUrl);
// free memory when ever this component is unmounted
return () => URL.revokeObjectURL(previewUrl);
}, [selectedIdProof]);

const handleIdUpload = (e) => {
if (!e.target.files || e.target.files.length === 0) {
  setSelectedIdProof(undefined);
  return;
}
setSelectedIdProof(e.target.files[0]);
};



//  -----------------------------------------------------Id Proof Upload ------------------------------------------------


// -----------------------------------------Firebase Upload Profile Pic --------------------------
const handleProfilePicUpload = (e) => {
e.preventDefault();
const fileName = new Date() + selectedFile.name;
const storage = getStorage(app);
const storageRef = ref(storage, fileName);
const uploadTask = uploadBytesResumable(storageRef, selectedFile);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on(
  "state_changed",
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress =
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgressUpload(progress);
  },
  (error) => {
    navigate("/error");
  },
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setProfilePic(downloadURL);
    });
  }
);
};

// -----------------------------------------Firebase Upload Id Proof --------------------------

const idProofUpload = (e) => {
  e.preventDefault()
  const fileName = new Date() + selectedIdProof.name
  const storage = getStorage(app)
  const storageRef = ref(storage, fileName)
  const uploadTask = uploadBytesResumable(storageRef,selectedIdProof )
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgressUpload(progress);
      // console.log("Upload is " + progress + "% done");
      // switch (snapshot.state) {
      //   case "paused":
      //     console.log("Upload is paused");
      //     break;
      //   case "running":
      //     console.log("Upload is running");
      //     break;
      // }
    },
    (error) => {
      navigate("/error");
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setGovtId(downloadURL);
      });
    }
  );
};



// ================================================================================================

   // Get patient details 
  useEffect(() => {
    const fetchDoctor = async () => {
     const res = await getDoctor(doctorId)
      if(res==='error'){
        navigate('/error')
      }
      setReqDoc(res)
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

      {progressUpload && (
       <div className="uploading">
         <div className="progressBar">
             <div className="progress" style={{width: `${progressUpload}%`}}>
 
             </div>
         </div>
       </div>
      )}

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
                <img src={preview} alt='' />
              ) : (
                <img src={reqDoc && (reqDoc.profilePic ? reqDoc.profilePic : '/assets/noProfilePic.png')} alt="" />
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
              <Button
               variant="contained"
               style={{ margin: "10px" }}
               onClick={handleProfilePicUpload}
             >
               Upload Now
             </Button>
            </div>

            <div className="identity">
              {selectedIdProof ? (
                <img src={IdPreview} alt=''/>
              ) : (
                <img src={reqDoc && (reqDoc.govtId ? reqDoc.govtId  : '/assets/noIdProof.png' )} alt="" />
  )
              }
              <div className="inputContainer">
                <label htmlFor="signature">
                  <Edit className="editIcon" />
                  Add Identity Proof
                </label>
                <input
                  type="file"
                  id="signature"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleIdUpload}
                />
              </div>
                 <Button
               variant="contained"
               style={{ margin: "10px" }}
               onClick={idProofUpload}
             >
               Upload Now
             </Button>
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
              value={sex ? sex : 'sex'}
               onChange={(e) => {
                e.target.value !== "sex" && setSex(e.target.value);
              }}
                required
              >
                {options.map((option) => (
              <option key={option.value} value={option.value} >{option.label}</option>
            ))}
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