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
      return 'error'
    }
  };

  // --------------------Delete a Patient ------------------------

  const deletePatient = async (patientId) => {
    try {
      await axios.delete(`${host}/patient/delete/${patientId}`);
      return 'success'
    } catch (error) {
      return 'error'
    }
  };

  // -------------------Add a new patient--------------------------

  const newPatient = async (name, email, password, phoneNumber, sex, age, profilePic, govtId, location) => {
    try {
        const res = await axios.post(`${host}/patient/register`, {name, email, password, phoneNumber, sex, age, profilePic, govtId, location})
        return res.data
    } catch (error) {
      return 'error'
    }
  };

  // -------------------Update patient details--------------------------

  const updatePatient = async (patientId, name, email, phoneNumber, sex, age, profilePic, govtId, location, prescriptions) =>{
    try {
        await axios.put(`${host}/patient/update/${patientId}`, {name, email, phoneNumber, sex, age, profilePic, govtId, location, prescriptions})
    } catch (error) {
      return 'error'
    }
  }

  // -------------------Find a patient from database---------------------

  const getPatient = async (patientId) => {
      try {
          const res = await axios.get(`${host}/patient/find/${patientId}`)
          return res.data
      } catch (error) {
        return 'error'
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
