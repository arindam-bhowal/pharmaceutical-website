import "./updateProfile.scss";
import { ArrowBack, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import patientContext from "../../context/patient/patientContext";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import pharmacyContext from "../../context/pharmacy/pharmacyContext";

const UpdateProfile = () => {
  const { updatePatient, getPatient } = useContext(patientContext);
  const { fetchAllPharmacies } = useContext(pharmacyContext)

  const { patientId } = useParams();

  const navigate = useNavigate();

  const [reqPatient, setReqPatient] = useState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [age, setAge] = useState();
  const [location, setLocation] = useState("");
  const [sex, setSex] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [govtId, setGovtId] = useState("");
  const [prescriptions, setPrescriptions] = useState([])

  const [locationOptions, setLocationOptions] = useState([])

  const [progressUpload, setProgressUpload] = useState();

  const sexOptions = [
    {
      label: "Sex",
      value: "Sex",
    },
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Others",
      value: "Others",
    }
  ];

  // ----------------Location -----------------

  useEffect(() => {
    const getAllLocations = async () => {
      const res = await fetchAllPharmacies();
      setLocationOptions(res);
    };
    getAllLocations();
  }, []);



  // -------------------------------- -----------

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const [selectedIdProof, setSelectedIdProof] = useState();
  const [IdPreview, setIdPreview] = useState();

  useEffect(() => {
    if (!selectedIdProof) {
      setIdPreview(undefined);
      return;
    }
    const previewUrl = URL.createObjectURL(selectedIdProof);
    setIdPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [selectedIdProof]);

  const handleIdUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedIdProof(undefined);
      return;
    }
    setSelectedIdProof(e.target.files[0]);
  };

  const [selectedPrescription, setSelectedPrescription] = useState()

  const handlePrescriptionUpload = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedPrescription(undefined);
      return;
    }
    setSelectedPrescription((prev => [...prev, {prescription: e.target.files[0], date: new Date()}]))
  }

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

  // -----------------------------------------Firebase Upload Prescription --------------------------
    const uploadPrescription = () => {
      const fileName = new Date() + selectedPrescription.name
      const storage = getStorage(app)
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, selectedPrescription)
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
            setPrescriptions(prev => [...prev, downloadURL])
          });
        }
      );
    };

  // ---------------------*******************---------------------------------------
  // Get patient details
  useEffect(() => {
    const fetchPatient = async () => {
      const res = await getPatient(patientId);
      setReqPatient(res);
    };
    fetchPatient();
  }, []);

  useEffect(() => {
    if (reqPatient) {
      setName(reqPatient.name);
      setEmail(reqPatient.email);
      setPhoneNumber(reqPatient.phoneNumber);
      setAge(reqPatient.age);
      setLocation(reqPatient.location);
      setSex(reqPatient.sex);
      setProfilePic(reqPatient.profilePic);
      setGovtId(reqPatient.govtId);
      setPrescriptions(reqPatient.prescriptions)
    }
  }, [reqPatient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePatient(
      patientId,
      name,
      email,
      phoneNumber,
      sex,
      age,
      profilePic,
      govtId,
      location,
      prescriptions
    );
    navigate("/patients");
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
          <h1>Update Patient Details</h1>
        </div>

        <form className="container" onSubmit={handleSubmit}>
          <div className="left">
            <div className="profilePic">
              {selectedFile ? (
                <img src={preview} alt='' />
              ) : (
                <img src={reqPatient && (reqPatient.profilePic ? reqPatient.profilePic : '/assets/noProfilePic.png')} alt="" />
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
                <img src={reqPatient && (reqPatient.govtId ? reqPatient.govtId : '/assets/noIdProof.png') } alt="" />
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

            <div
              className="prescription"
              style={{
                margin: "20px auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input type="file" name="" id="" onChange={handlePrescriptionUpload} />
              <Button variant="contained" onClick={uploadPrescription}>Upload Prescription</Button>
            </div>
          </div>
          <div className="right">
            <div className="group">
              <input
                name="name"
                type="text"
                required
                defaultValue={reqPatient && reqPatient.name}
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
                defaultValue={reqPatient && reqPatient.email}
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
              <label>Password cannot be changed</label>
            </div>

            <div className="group">
              <input
                name="phoneNumber"
                type="number"
                required
                defaultValue={reqPatient && reqPatient.phoneNumber}
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
                  defaultValue={reqPatient && reqPatient.age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="location">
              <select
              value={location ? location : 'Location'}
               onChange={(e) => {
                e.target.value !== "Location" && setSex(e.target.value);
              }}
                required
              >
                {locationOptions.map((option) => (
              <option key={option.drugLicenseNo} value={option.branch} >{option.branch}</option>
            ))}
              </select>
              </div>

              <div className="sex">
              <select
              value={sex ? sex : 'Sex'}
               onChange={(e) => {
                e.target.value !== "Sex" && setSex(e.target.value);
              }}
                required
              >
                {sexOptions.map((option) => (
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
  );
};

export default UpdateProfile;
