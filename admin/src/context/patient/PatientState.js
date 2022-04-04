import patientContext from "./patientContext";
import axios from "axios";

const PatientState = (props) => {
  const host = "http://localhost:8801/api";


  // =============================================================
  //   Api Calls
  // =============================================================

  // -------------------- Get all patients ------------------------
  const fetchAllPatients = async () => {
    try {
      const res = await axios.get(`${host}/admin/patient/all`);
      return res.data;
    } catch (error) {
      // To do
    }
  };

  // --------------------Delete a Patient ------------------------

  const deletePatient = async (patientId) => {
    try {
      await axios.delete(`${host}/admin/patient/delete/${patientId}`);
    } catch (error) {
      // To do
    }
  };

  // -------------------Add a new patient--------------------------

  const newPatient = async (name, email, password, phoneNumber, sex, age, profilePic, govtId, location) => {
    try {
        await axios.post(`${host}/admin/patient/register`, {name, email, password, phoneNumber, sex, age, profilePic, govtId, location})
    } catch (error) {
      // To do
    }
  };






  return (
    <patientContext.Provider value={{ fetchAllPatients, deletePatient, newPatient}}>
      {props.children}
    </patientContext.Provider>
  );
};

export default PatientState;
