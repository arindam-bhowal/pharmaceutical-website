import './updateWorker.scss'
import { ArrowBack, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import workerContext from "../../../context/worker/workerContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
 } from "firebase/storage";
 import app from "../../../firebase";

const UpdateWorker = () => {
  
  const { updateWorker, getWorker } = useContext(workerContext);

  const { workerId } = useParams()

  const navigate = useNavigate();

  const [reqWorker, setReqWorker] = useState()

    // All UseStates -------------------------------
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const password ='jankalyan'  
    const [phoneNumber, setPhoneNumber] = useState();
    const [age, setAge] = useState();
    const [sex, setSex] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [govtId, setGovtId] = useState("");
    const [location, setLocation] = useState('')
    const [referals, setReferals] = useState([])
    const [referalId, setReferalId] = useState('')
  
    const [percentPerReferal, setPercentPerReferal] = useState()
  
    const [progressUpload, setProgressUpload] = useState();
   

//------------------------------ File upload-------------------------------

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
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgressUpload(progress);
    },
    (error) => {
      navigate("/error");
    },
    () => {
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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressUpload(progress);
      },
      (error) => {
        navigate("/error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setGovtId(downloadURL);
        });
      }
    );
  };



// ================================================================================================

    //   *******************************File Upload**********************************



  useEffect(() => {
    const fetchWorker = async () => {
      const res = await getWorker(workerId)
      setReqWorker(res)
    }
    fetchWorker()
  }, [])

  useEffect(() => {
    if(reqWorker){
      setName(reqWorker.name)
      setEmail(reqWorker.email)
      setPhoneNumber(reqWorker.phoneNumber)
      setAge(reqWorker.age)
      setLocation(reqWorker.location)
      setSex(reqWorker.sex)
      setProfilePic(reqWorker.profilePic)
      setGovtId(reqWorker.govtId)
      setReferalId(reqWorker.referalId)
      setReferals(reqWorker.referals)
    }
  }, [reqWorker])
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateWorker(workerId ,  name, email, password, phoneNumber, age, sex, profilePic, govtId, location, referals,referalId, percentPerReferal )
    // await updatePatient(patientId, name, email, phoneNumber, sex, age, profilePic, govtId, location)
    navigate("/workers");
  };
  

  return (
    <div className="updateProfile">
      <div className="wrapper">

      {progressUpload &&
       <div className="uploading">
         <div className="progressBar">
             <div className="progress" style={{width: `${progressUpload}%`}}>
 
             </div>
         </div>
       </div>}

        <ArrowBack
          className="backBtn"
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className="header">
          <h1>Update Worker Details</h1>
        </div>

        <form className="container" onSubmit={handleSubmit}>
          <div className="left">

          <div className="profilePic">
              {selectedFile ? (
                <img src={preview} alt='' />
              ) : (
                <img src={reqWorker && reqWorker.profilePic} alt="" />
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
                <img src={reqWorker && reqWorker.govtId} alt="" />
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
              defaultValue={reqWorker && reqWorker.name}
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
              defaultValue={reqWorker && reqWorker.email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              defaultValue={reqWorker && reqWorker.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Phone Number</label>
          </div>

          <div className="group">
            <input
              name="location"
              type="text" 
              defaultValue={reqWorker && reqWorker.location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Location</label>
          </div>

          <div className="group">
            <input
              name="percentPerReferal"
              type="number"
              defaultValue={reqWorker && reqWorker.percentPerReferal}
              onChange={(e) => setPercentPerReferal(e.target.value)}
              required
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Percent Per Referal</label>
          </div>

          <div className="ageSexLocation">
            <div className="age">
              <input
                name="age"
                placeholder="Age"
                type="number"
                defaultValue={reqWorker && reqWorker.age}
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
                <option>
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
  );
};

export default UpdateWorker;
