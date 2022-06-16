import "./history.scss";
import Navbar from "../../components/navbar/Navbar";
import { FileCopy, FileDownload } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";

const History = () => {
  const { fetchPatient } = useContext(userContext);

  const [reqUserId, setReqUserId] = useState("");
  const [requser, setRequser] = useState([]);
  const [allPrescriptions, setAllPrescriptions] = useState([]);

  // -----Fetching User --------------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setReqUserId(user._id);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetchPatient(reqUserId);
      setRequser(res.data);
    };
    if (reqUserId) {
      getUser();
    }
  }, [reqUserId]);

  // -------------Find all Prescription of the specific user --------------

  useEffect(() => {
    setAllPrescriptions(requser.prescriptions);
  }, [requser]);

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="history">
        <h1 className="heading">History</h1>
        <div className="historyCards">
          <div className="wrapper">
            {/* <h1 style={{textAlign: 'center', color: 'purple'}}>
              No Previous Info Found
            </h1> */}

            {allPrescriptions &&
              allPrescriptions.map((prescription) => {
                return (
                  <div key={Date.now()} className="card">
                    <div className="icon">
                      <FileCopy className="cardIcon" />
                    </div>
                    <div className="details">
                      <div className="date">{prescription.date}</div>
                      <div className="download">Download Prescription now</div>
                    </div>
                    <div className="icon download">
                      <a href={prescription.prescription} rel="noopener" target='_blank' style={{color: 'black'}}>
                      <FileDownload className="cardIcon" />
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
