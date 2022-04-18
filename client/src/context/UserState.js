import userContext from "./userContext";
import axios from 'axios'

const UserState = (props) => {

    const host = "http://localhost:8801/api/patient";

    //  Patient Login
    const patientLogin = async(email, password) => {
        try {
            const res = axios.post(`${host}/login`, {email, password})
            return res
        } catch (error) {
            return 'error'
        }
    }

    const fetchPatient = async(userId) => {
        try {
            const res = axios.get(`${host}/find/${userId}`)
            return res
        } catch (error) {
            return 'error'
        }
    }


    const updateUser = async (userId, name, email, password, phoneNumber, age, location, sex, profilePic, govtId) => {
        try {
            await axios.put(`${host}/update/${userId}`, { name, email, password, phoneNumber, age, location, sex, profilePic, govtId })
            return 'success'
        } catch (error) {
            return 'error'
        }
    }


    return (
    <userContext.Provider value={{ patientLogin, fetchPatient, updateUser }}>
        {props.children}
    </userContext.Provider>
    )
}

export default UserState