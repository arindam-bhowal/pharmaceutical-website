import patientContext from "./patientContext";
import axios from "axios";

const PatientState = (props) => {
  const host = "http://localhost:8801/api/admin";


  // =============================================================
  //   Api Calls
  // =============================================================

  // -------------------- Get all patients ------------------------
  const fetchAllPatients = async () => {
    try {
      const res = await axios.get(`${host}/patient/all`);
      return res.data;
    } catch (error) {
      // To do
    }
  };

  // --------------------Delete a Patient ------------------------

  const deletePatient = async (patientId) => {
    try {
      await axios.delete(`${host}/patient/delete/${patientId}`);
    } catch (error) {
      // To do
    }
  };

  // -------------------Add a new patient--------------------------

  const newPatient = async (name, email, password, phoneNumber, sex, age, profilePic, govtId, location) => {
    try {
        await axios.post(`${host}/patient/register`, {name, email, password, phoneNumber, sex, age, profilePic, govtId, location})
    } catch (error) {
      // To do
    }
  };

  // -------------------Update patient details--------------------------

  const updatePatient = async (patientId, name, email, phoneNumber, sex, age, profilePic, govtId, location, prescriptions) =>{
    try {
        await axios.put(`${host}/patient/update/${patientId}`, {name, email, phoneNumber, sex, age, profilePic, govtId, location, prescriptions})
    } catch (error) {
        //  To do
    }
  }

  // -------------------Find a patient from database---------------------

  const getPatient = async (patientId) => {
      try {
          const res = await axios.get(`${host}/patient/find/${patientId}`)
          return res.data
      } catch (error) {
        //   to do
      }
  }


  // -----------------Patient Stats ------------------------------------
  const patientStats = () => {
    try {
      const res = axios.get(`${host}/stats`)
      return res
    } catch (error) {
      return 'error'
    }
  }




  return (
    <patientContext.Provider value={{ fetchAllPatients, deletePatient, newPatient, updatePatient, getPatient, patientStats}}>
      {props.children}
    </patientContext.Provider>
  );
};

export default PatientState;
