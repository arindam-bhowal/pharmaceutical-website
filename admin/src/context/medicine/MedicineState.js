import medicineContext from "./medicineContext";
import axios from "axios";

const MedicineState = (props) => {
  const host = "http://localhost:8801/api/admin";

  // =============================================================
  //   Api Calls
  // =============================================================

  // -------------------- Get all Medicines ----------------------

  const fetchAllMedicines = async () => {
    try {
      const res = await axios.get(`${host}/medicine/all`);
      return res.data;
    } catch (error) {
      return "error";
    }
  };

  // --------------------Delete a Medicine form database ------------------------

  const deleteMedicine = async (medicineId) => {
    try {
      await axios.delete(`${host}/medicine/delete/${medicineId}`);
      return "success";
    } catch (error) {
      return "error";
    }
  };

  // --------------------Add a new Medicine in database ------------------------

  const newMedicine = async (
    drugName,
    manufacturer,
    expireDate,
    costPrice,
    sellingPrice,
    quantity,
    location
  ) => {
    try {
      await axios.post(`${host}/medicine/new`, {
        drugName,
        manufacturer,
        expireDate,
        costPrice,
        sellingPrice,
        quantity,
        location
      });
      return "success";
    } catch (error) {
      return "error";
    }
  };

  //   --------------------Update medicine details ---------------------------------

  const updateMedicine = async (
    medicineId,
    drugName,
    manufacturer,
    expireDate,
    costPrice,
    sellingPrice,
    quantity,
    location
  ) => {
    try {
      await axios.put(`${host}/medicine/update/${medicineId}`, {
        drugName,
        manufacturer,
        expireDate,
        costPrice,
        sellingPrice,
        quantity,
        location
      });
      return "success";
    } catch (error) {
      return "error";
    }
  };

  //   ---------------------------Find a medicine from database---------------------

  const getMedicine = async (medicineId) => {
    try {
      const res = axios.get(`${host}/medicine/get/${medicineId}`);
      return res;
    } catch (error) {
      return "error";
    }
  };

  return (
    <medicineContext.Provider
      value={{
        fetchAllMedicines,
        deleteMedicine,
        newMedicine,
        updateMedicine,
        getMedicine,
      }}
    >
      {props.children}
    </medicineContext.Provider>
  );
};

export default MedicineState;
