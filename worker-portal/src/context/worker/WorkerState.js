import workerContext from './workerContext'
import axios from "axios";

const WorkerState = (props) => {

    const host = "http://localhost:8801/api/worker";

      // =============================================================
  //   Api Calls
  // =============================================================

  // ----------------------- Get all Workers --------------------------

  
        // -----------------------Login worker ---------------------------

        const loginWorker = async (email, password) => {
            try {
                const res = axios.post(`${host}/login`, {email, password})
                return res
            } catch (error) {
                return 'error'
            }
        }
   

           // --------------------Register a worker in database ------------------------

     const registerWorker = async (name, email, password, phoneNumber, age, sex, profilePic, govtId, referals ,referalId, percentPerReferal) => {
        try {
            const res = await axios.post(`${host}/register`, {name, email, password, phoneNumber, age, sex, profilePic, govtId, referals ,referalId, percentPerReferal})
            return res
        } catch (error) {
            return 'error'
        }
     }

      //   --------------------------- Update worker credentials ---------------------------

     const updateWorker = async (workerId, name, email, password, phoneNumber, age, sex, profilePic, govtId, referals,referalId, percentPerReferal) => {
         try {
             await axios.put(`${host}/worker/update/${workerId}`, { name, email, password, phoneNumber, age, sex, profilePic, govtId, referals,referalId, percentPerReferal })
             return 'sucess'
         } catch (error) {
             return 'error'
         }
     }

     //   ---------------------------Find a Worker from database---------------------

     const getWorker = async (workerId) => {
         try {
             const res = await axios.get(`${host}/find/${workerId}`)
             return res.data
         } catch (error) {
             return 'error'
         }
     }
     




    return(
        <workerContext.Provider value={{loginWorker, registerWorker, updateWorker, getWorker}}>
            {props.children}
        </workerContext.Provider>
    )
}

export default WorkerState