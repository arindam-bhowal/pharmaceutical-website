import "./profile.scss";
import { ArrowBack, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import userContext from "../../context/userContext";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import Navbar from "../../components/navbar/Navbar";
import pharmacyContext from "../../context/pharmacy/pharmacyContext";

const Profile = () => {
  const { fetchPatient, updateUser } = useContext(userContext);
  const { fetchAllPharmacies } = useContext(pharmacyContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [age, setAge] = useState();
  const [location, setLocation] = useState("");
  const [sex, setSex] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [govtId, setGovtId] = useState("");

  const [progressUpload, setProgressUpload] = useState();
  const [locationOptions, setLocationOptions] = useState([]);

  const [reqUser, setRequser] = useState([]);

  // ----------------Location -----------------

  useEffect(() => {
    const getAllLocations = async () => {
      const res = await fetchAllPharmacies();
      setLocationOptions(res);
    };
    getAllLocations();
  }, []);

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
    e.preventDefault();
    const fileName = new Date() + selectedIdProof.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedIdProof);
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

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("user"));
    setRequser(res);

    setName(reqUser.name);
    setEmail(reqUser.email);
    setPhoneNumber(reqUser.phoneNumber);
    setAge(reqUser.age);
    setLocation(reqUser.location);
    setSex(reqUser.sex);
    setProfilePic(reqUser.profilePic);
    setGovtId(reqUser.govtId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateUser(
      reqUser._id,
      name,
      email,
      password,
      phoneNumber,
      age,
      location,
      sex,
      profilePic,
      govtId
    );
    if (res === "error") {
      navigate("/error");
    }
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="profile">
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
            <h1>Update Profile</h1>
          </div>

          <form className="container" onSubmit={handleSubmit}>
            <div className="left">
              <div className="profilePic">
                {selectedFile ? (
                  <img src={preview} alt="" />
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
                  required
                  defaultValue={reqUser && reqUser.name}
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
                  defaultValue={reqUser && reqUser.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Email</label>
              </div>

              <div className="group">
                <input
                  name="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Password *</label>
              </div>

              <div className="group">
                <input
                  name="phoneNumber"
                  type="number"
                  required
                  defaultValue={reqUser && reqUser.phoneNumber}
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
                    defaultValue={reqUser && reqUser.age}
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
                    <option value="Location">Location</option>
                    {locationOptions.map((option) => (
                      <option key={option.drugLicenseNo} value={option.branch}>
                        {option.branch}
                      </option>
                    ))}
                  </select>
                </div>

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
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
