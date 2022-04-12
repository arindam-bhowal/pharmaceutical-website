import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import Sidebar from "../../components/sidebar/Sidebar";
import patientContext from "../../context/patient/patientContext";
import doctorContext from "../../context/doctor/doctorContext";
import workerContext from "../../context/worker/workerContext";
import "./dashboard.scss";
import axios from "axios";


const Dashboard = () => {
  const [userStats, setUserStats] = useState([]);

  const { patientStats, fetchAllPatients } = useContext(patientContext);
  const { fetchAllDoctors } = useContext(doctorContext);
  const { fetchAllWorkers } = useContext(workerContext);

  const [noOfPatient, setNoOfPatient] = useState(0);
  const [noOfWorker, setNoOfWorker] = useState(0);
  const [noOfDoctor, setNoOfDoctor] = useState(0);

  const navigate = useNavigate();

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await patientStats()
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } 
      catch {
        navigate('/error')
      }
    };
    getStats();
  }, [MONTHS, patientStats]);

  useEffect(() => {
    const calculateUsers = async () => {
      const patients = await fetchAllPatients()
      const workers = await fetchAllWorkers()
      const doctors = await fetchAllDoctors()

      setNoOfPatient(patients.length)
      setNoOfWorker(workers.length)
      setNoOfDoctor(doctors.length)
    }
    calculateUsers()
  }, [])
  

  return (
    <>
      <Sidebar />
      <div className="dashboard">
        <div className="top">
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
            className="chart"
          />

          <div className="netEarning">
            <h2>Net Earning</h2>
            <span> ₹ 232 </span>
          </div>
        </div>

        <div className="bottom">
          <div className="totalPatients dashboardCard">
            <h2>Total Patients</h2>
            <span> {noOfPatient} </span>
          </div>
          <div className="totalWorkers dashboardCard">
            <h2>Total Workers</h2>
            <span> {noOfWorker} </span>
          </div>
          <div className="totalDoctors dashboardCard">
            <h2>Total Doctors</h2>
            <span> {noOfDoctor} </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
