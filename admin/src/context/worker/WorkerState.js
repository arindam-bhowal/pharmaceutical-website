import workerContext from './workerContext'
import axios from "axios";

const WorkerState = (props) => {

    const host = "http://localhost:8801/api/admin";

      // =============================================================
  //   Api Calls
  // =============================================================

  // ----------------------- Get all Workers --------------------------

  const fetchAllWorkers = async () => {
      try {
          const res = await axios.get(`${host}/worker/all`)
          return res.data
      } catch (error) {
          return 'error'
      }
  }


      // --------------------Delete a Worker form database ------------------------

      const deleteWorker = async (workerId) => {
          try {
              await axios.delete(`${host}/worker/delete/${workerId}`)
              return 'success'
          } catch (error) {
              return 'error'
          }
      }

           // --------------------Add a new worker in database ------------------------

     const newWorker = async (name, email, password, phoneNumber, age, sex, profilePic, govtId, location, noOfReferals,referalId, percentPerReferal) => {
        try {
            await axios.post(`${host}/worker/register`, {name, email, password, phoneNumber, age, sex, profilePic, govtId, location, noOfReferals,referalId, percentPerReferal})
            return 'success'
        } catch (error) {
            return 'error'
        }
     }

      //   --------------------------- Update worker credentials ---------------------------

     const updateWorker = async (workerId, name, email, password, phoneNumber, age, sex, profilePic, govtId, location, noOfReferals,referalId, percentPerReferal) => {
         try {
             await axios.put(`${host}/worker/update/${workerId}`, { name, email, password, phoneNumber, age, sex, profilePic, govtId, location, noOfReferals,referalId, percentPerReferal })
             return 'sucess'
         } catch (error) {
             return 'error'
         }
     }

     //   ---------------------------Find a Worker from database---------------------

     const getWorker = async (workerId) => {
         try {
             const res = await axios.get(`${host}/worker/find/${workerId}`)
             return res.data
         } catch (error) {
             return 'error'
         }
     }
     




    return(
        <workerContext.Provider value={{fetchAllWorkers, deleteWorker, newWorker, updateWorker, getWorker}}>
            {props.children}
        </workerContext.Provider>
    )
}

export default WorkerState