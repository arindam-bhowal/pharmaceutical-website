import "./patients.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import patientContext from "../../context/patient/patientContext";

const Patients = () => {

  const [allPatients, setAllPatients] = useState([])

  const { fetchAllPatients } = useContext(patientContext);

  useEffect(() => {
      const getAllPatients = async () => {
        const res = await fetchAllPatients()
        setAllPatients(res)
      }
      getAllPatients()
      console.log(allPatients)
  }, []);

  return (
    <div className="patients">
      <div className="left">
        <Sidebar />
      </div>

      <div className="main">
        <div className="top">
          <Typography variant="h2" component="h3">
            Patient's Database
          </Typography>
        </div>
        <div className="bottom">
          <Table data={allPatients} />
        </div>
      </div>
    </div>
  );
};

export default Patients;
