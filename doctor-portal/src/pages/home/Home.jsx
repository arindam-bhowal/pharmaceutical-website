import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import doctorContext from "../../context/doctor/doctorContext";
import patientContext from "../../context/patient/patientContext";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();

  const { getDoctor } = useContext(doctorContext)

  const { fetchAllPatients } = useContext(patientContext)

  const [doctorId, setDoctorId] = useState("");
  const [reqDoc, setReqDoc] = useState();

  const [allPatients, setAllPatients] = useState([])

  const [filteredArray, setFilteredArray] = useState([])
  const [netEarning, setNetEarning] = useState(0)


  useEffect(() => {
    if (localStorage.getItem("doc")) {
      setDoctorId(JSON.parse(localStorage.getItem("doc"))._id);
    }
    else{
      navigate("/error");
    }
  }, []);

  // Get doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      if(doctorId){
        const res = await getDoctor(doctorId);
        if (res === "error") {
          navigate("/error");
        }
        setReqDoc(res);
      }
    };
    fetchDoctor();
  }, [getDoctor, doctorId]);

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
    if(allPatients && reqDoc){
      const newArray = allPatients.filter(patient => patient.referedBy === reqDoc.referalId)
      setFilteredArray(newArray)
    }
  }, [reqDoc, allPatients])

  
  //  ----Calculating earning in this month----
  useEffect(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const filteredPayment = []
    filteredArray.map(patient => {
      const paymentArray = 
      patient.payments
      .filter(payment => payment.status === 'success')
      .filter(payment => new Date(payment.date).getMonth() === currentMonth && new Date(payment.date).getFullYear() === currentYear)
      filteredPayment.push(...paymentArray)
    })
    let total = 0
    filteredPayment && filteredPayment.map(payment => {
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
            <div className="content">{reqDoc ? (filteredArray && filteredArray.length): 0}</div>
          </div>

          <div className="card">
            <h2>Referal Id</h2>
            <div className="content">{reqDoc ? reqDoc.referalId: 'undefined'}</div>
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
