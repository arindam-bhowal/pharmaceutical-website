import "./updateDoctor.scss";
import { ArrowBack, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import doctorContext from "../../../context/doctor/doctorContext";

const UpdateDoctor = () => {
  const { updateDoctor, getDoctor } = useContext(doctorContext);

  const { doctorId } = useParams();

  const navigate = useNavigate();

  const [reqDoctor, setReqDoctor] = useState();

  // All UseStates -------------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNo, setRegistrationNo] = useState();
  const password = "janKalyan";
  const [phoneNumber, setPhoneNumber] = useState();
  const [age, setAge] = useState();
  const [sex, setSex] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [govtId, setGovtId] = useState("");
  const [referals, setReferals] = useState([]);
  const [referalId, setReferalId] = useState("");

  const [percentPerReferal, setPercentPerReferal] = useState();

  const [progressUpload, setProgressUpload] = useState();

  const options = [
    {
      label: "Sex",
      value: "Sex",
      isDisabed: true,
    },
    {
      label: "Male",
      value: "Male",
      isDisabed: false,
    },
    {
      label: "Female",
      value: "Female",
      isDisabed: false,
    },
    {
      label: "Others",
      value: "Others",
      isDisabed: false,
    },
  ];

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

  //   *******************************File Upload**********************************

  useEffect(() => {
    const fetchDoctor = async () => {
      const res = await getDoctor(doctorId);
      setReqDoctor(res);
    };
    fetchDoctor();
  }, []);

  useEffect(() => {
    if (reqDoctor) {
      setName(reqDoctor.name);
      setEmail(reqDoctor.email);
      setRegistrationNo(reqDoctor.registrationNo);
      setPhoneNumber(reqDoctor.phoneNumber);
      setAge(reqDoctor.age);
      setSex(reqDoctor.sex);
      setProfilePic(reqDoctor.profilePic);
      setGovtId(reqDoctor.govtId);
      setReferalId(reqDoctor.referalId);
      setReferals(reqDoctor.referals);
      setPercentPerReferal(reqDoctor.percentPerReferal);
    }
  }, [reqDoctor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoctor(
      doctorId,
      name,
      email,
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
    <div className="updateDoctor">
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
          <h1>Update Worker Details</h1>
        </div>

        <form className="container" onSubmit={handleSubmit}>
          <div className="left">
            <div className="profilePic">
              {selectedFile ? (
                <img src={preview} alt="" />
              ) : (
                <img
                  src={
                    reqDoctor &&
                    (reqDoctor.profilePic
                      ? reqDoctor.profilePic
                      : "/assets/noProfilePic.png")
                  }
                  alt=""
                />
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
                <img
                  src={
                    reqDoctor &&
                    (reqDoctor.govtId
                      ? reqDoctor.govtId
                      : "/assets/noIdProof.png")
                  }
                  alt=""
                />
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
                defaultValue={reqDoctor && reqDoctor.name}
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
                defaultValue={reqDoctor && reqDoctor.email}
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
                defaultValue={reqDoctor && reqDoctor.registrationNo}
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
                defaultValue={reqDoctor && reqDoctor.phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Phone Number</label>
            </div>

            <div className="group">
              <input
                name="percentPerReferal"
                type="number"
                defaultValue={reqDoctor && reqDoctor.percentPerReferal}
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
                  defaultValue={reqDoctor && reqDoctor.age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="sex">
                <select
                  value={sex ? sex : "sex"}
                  onChange={(e) => {
                    e.target.value !== "sex" && setSex(e.target.value);
                  }}
                  required
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
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

export default UpdateDoctor;
