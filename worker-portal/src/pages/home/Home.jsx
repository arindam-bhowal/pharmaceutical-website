import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import doctorContext from "../../context/doctor/doctorContext";
import patientContext from "../../context/patient/patientContext";
import workerContext from "../../context/worker/workerContext";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();

  const {getWorker} = useContext(workerContext)

  const { fetchAllPatients } = useContext(patientContext)

  const [workerId, setWorkerId] = useState('')
  const [reqWorker, setReqWorker] = useState()

  const [allPatients, setAllPatients] = useState([])
  const [filteredArray, setFilteredArray] = useState([])
  const [netEarning, setNetEarning] = useState(0)

  useEffect(() => {
    if (localStorage.getItem("worker")) {
        setWorkerId(JSON.parse(localStorage.getItem("worker"))._id);
    }
    else{
      navigate("/error");
    }
  }, []);

  // Get worker details
  useEffect(() => {
    const fetchWorker = async () => {
      if(workerId){
        const res = await getWorker(workerId);
        if (res === "error") {
          navigate("/error");
        }
        setReqWorker(res);
      }
    };
    fetchWorker();
  }, [getWorker, workerId]);

  //  Get all patients

  useEffect(() => {
    const getAllPatients = async () => {
      const res = await fetchAllPatients()
      setAllPatients(res)
    }
    getAllPatients()
  }, [])

  // Filtering the patients Array

  useEffect(() => {
    if(allPatients && reqWorker){
      const newArray = allPatients.filter(patient => patient.referedBy === reqWorker.referalId)
      setFilteredArray(newArray)
    }
  }, [reqWorker, allPatients])

  //  ----Calculating earning in this month----
  useEffect(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const filteredPayment = []
    filteredArray.map(patient => {
      const paymentArray = 
      patient.payments
      .filter(payment => payment.status === 'success')
      // .filter(payment => payment.date.getMonth() === currentMonth && payment.date.getFullYear() === currentYear)
      filteredPayment.push(...paymentArray)
    })
    const total = 0
    filteredPayment.payments && filteredPayment.payments.map(payment => {
      total += payment.amount 
    })
    setNetEarning(total)
  }, [filteredArray])
  
  
  

  return (
    <>
      <Sidebar />
      <div className="home">
        <div className="left">
          <div className="card">
            <h2>Number of refered Patients</h2>
            <div className="content">{reqWorker ? (filteredArray && filteredArray.length): 0}</div>
          </div>

          <div className="card">
            <h2>Referal ID</h2>
            <div className="content">{reqWorker ? reqWorker.referalId: 'undefined'}</div>
          </div>

          <div className="card">
            <h2>Earning this Month</h2>
            <div className="content"> ₹ {netEarning}</div>
          </div>
        </div>
        <div className="right">
          <table>
            <tr>
              <th className="tableTitle">People refered to - </th>
            </tr>
            {
              filteredArray.map(data => {
                return (
            <tr>
              <td className="tableContent">{data.name}</td>
            </tr>
                )
              })
            }
            {/* <tr>
              <td>Centro comercial Moctezuma</td>
            </tr> */}
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
