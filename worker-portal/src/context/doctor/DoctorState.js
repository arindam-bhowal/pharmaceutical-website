import doctorContext from "./doctorContext"
import axios from "axios";

const DoctorState = (props) => {

    const host = "http://localhost:8801/api/doctor";

      // =============================================================
  //   Api Calls
  // =============================================================


     // --------------------Add a new Doctor in database ------------------------

     const registerDoctor = async (name, email, password, phoneNumber, sex, age , profilePic, govtId, registrationNo, referals,referalId, percentPerReferal) => {
         try {
             await axios.post(`${host}/register`, { name, email, password, phoneNumber, sex, age , profilePic, govtId, registrationNo, referals,referalId, percentPerReferal })
             return 'success'
         } catch (error) {
             return 'error'
         }
     }

     // --------------------Doctor Login ------------------------

     const loginDoctor = async (email, password) => {
         try {
             const res = axios.post(`${host}/login`, {email, password})
             return res
         } catch (error) {
             return 'error'
         }
     }


     // --------------------Fetch All Doctors ------------------------

     const fetchAllDoctors = async () => {
         try {
             const res = axios.get(`${host}/all`)
             return res
         } catch (error) {
             return 'error'
         }
     }



      //   --------------------------- Update doctor credentials ---------------------------

      const updateDoctor = async (doctorId, name, email, phoneNumber, sex, age , profilePic, govtId, registrationNo, referals,referalId, percentPerReferal) => {
          try {
              await axios.put(`${host}/update/${doctorId}`, {name, email, phoneNumber, sex, age , profilePic, govtId, registrationNo, referals,referalId, percentPerReferal})
          } catch (error) {
              return 'error'
          }
      }

        //   ---------------------------Find a Doctor from database---------------------

        const getDoctor = async (doctorId) => {
            try {
                const res = await axios.get(`${host}/find/${doctorId}`)
                return res.data
            } catch (error) {
                return 'error'
            }
        }

        // ----------------------------------Delete Worker ---------------------------------

        const deleteDoctor = async (doctorId) => {
            try {
                await axios.delete(`${host}/delete/${doctorId}`)
                return 'success'
            } catch (error) {
                return 'error'
            }
        }



    return (
    <doctorContext.Provider value={{ registerDoctor, loginDoctor ,  updateDoctor, getDoctor, fetchAllDoctors, deleteDoctor}}>
        {props.children}
    </doctorContext.Provider>
    )
}

export default DoctorState