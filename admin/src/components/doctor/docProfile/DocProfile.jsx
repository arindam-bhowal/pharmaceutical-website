import { ArrowBack, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import doctorContext from "../../../context/doctor/doctorContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import referralCodeGenerator from "referral-code-generator";
import "./docProfile.scss";

const DocProfile = () => {
  const { newDoctor } = useContext(doctorContext);

  const navigate = useNavigate();

  // All UseStates -------------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const password = "janKalyan";
  const [phoneNumber, setPhoneNumber] = useState();
  const [age, setAge] = useState();
  const [sex, setSex] = useState("");
  const [registrationNo, setRegistrationNo] = useState();
  const [profilePic, setProfilePic] = useState("");
  const [govtId, setGovtId] = useState("");
  const referals = []
  const [referalId, setReferalId] = useState("");
  const percentPerReferal = 2

  const [progressUpload, setProgressUpload] = useState();

  //  Generate referal Id
  useEffect(() => {
    let code = referralCodeGenerator.custom('lowercase', 8, 4, `doc-${name}`);
    setReferalId(code)
  }, [name])

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
    e.preventDefault();
    const fileName = new Date() + selectedIdProof.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedIdProof);
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

  //   *******************************File Upload**********************************

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newDoctor(
      name,
      email,
      password,
      phoneNumber,
      sex,
      age,
      profilePic,
      govtId,
      registrationNo,
      referals,
      referalId,
      percentPerReferal
    );
    navigate("/doctors");
  };

  return (
    <div className="docProfile">
      <div className="wrapper">
        {progressUpload && (
          <div className="uploading">
            <div className="progressBar">
              <div
                className="progress"
                style={{ width: `${progressUpload}%` }}
              ></div>
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
          <h1>Add Doctor</h1>
        </div>

        <form className="container" onSubmit={handleSubmit}>
          <div className="left">
            <div className="profilePic">
              {selectedFile ? (
                <img src={preview} alt="" />
              ) : (
                <img src="/assets/noProfilePic.png" alt="" />
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
                <img src={IdPreview} alt="" />
              ) : (
                <img src="/assets/noIdProof.png" alt="" />
              )}
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
                  <option defaultValue="0">Sex</option>
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

export default DocProfile;
