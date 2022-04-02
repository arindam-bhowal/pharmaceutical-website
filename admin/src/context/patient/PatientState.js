import patientContext from "./patientContext";
import axios from "axios"


const PatientState = (props) => {

    const host = 'http://localhost:8800/api'


    // =============================================================
    //   Api Calls
    // =============================================================


    // -------------------- Get all patients ------------------------
    const fetchAllPatients = async () =>{
        try {
            const res = await axios.get(`${host}/admin/patient/all`)
            return res.data
        } catch (error) {
            // To do 
        }
    }


    return (
        <patientContext.Provider value ={{fetchAllPatients}}>
            {props.children}
        </patientContext.Provider>
    )
}

export default PatientState