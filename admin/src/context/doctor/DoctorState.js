import doctorContext from "./doctorContext"
import axios from "axios";

const DoctorState = (props) => {

    const host = "http://localhost:8801/api/admin";

      // =============================================================
  //   Api Calls
  // =============================================================

  // -------------------- Get all Doctors ----------------------


  const fetchAllDoctors = async () => {
      try {
          const res = await axios.get(`${host}/doctor/all`)
          return res.data
      } catch (error) {
          return 'error'
      }
  }

    // --------------------Delete a Doctor form database ------------------------

    const deleteDoctor = async (doctorId) => {
        try {
            await axios.delete(`${host}/doctor/delete/${doctorId}`)
            return 'success'
        } catch (error) {
            return 'error'
        }
    }

     // --------------------Add a new Doctor in database ------------------------

     const newDoctor = async (name, email, password, phoneNumber, sex, age , profilePic, govtId, registrationNo) => {
         try {
             await axios.post(`${host}/doctor/register`, { name, email, password, phoneNumber, sex, age , profilePic, govtId, registrationNo })
             return 'success'
         } catch (error) {
             return 'error'
         }
     }

      //   --------------------------- Update doctor credentials ---------------------------

      const updateDoctor = async (doctorId, name, email, phoneNumber, sex, age , profilePic, govtId, registrationNo) => {
          try {
              axios.put(`${host}/doctor/update/${doctorId}`, {name, email, phoneNumber, sex, age , profilePic, govtId, registrationNo})
          } catch (error) {
              return 'error'
          }
      }

        //   ---------------------------Find a Doctor from database---------------------

        const getDoctor = async (doctorId) => {
            try {
                const res = await axios.get(`${host}/doctor/find/${doctorId}`)
                return res.data
            } catch (error) {
                return 'error'
            }
        }





    return (
    <doctorContext.Provider value={{ fetchAllDoctors, deleteDoctor, newDoctor, updateDoctor, getDoctor}}>
        {props.children}
    </doctorContext.Provider>
    )
}

export default DoctorState