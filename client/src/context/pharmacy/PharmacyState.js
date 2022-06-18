import axios from "axios";
import pharmacyContext from "./pharmacyContext";

const PharmacyState = (props) => {
  const host = "http://localhost:8801/api/admin/pharmacy";

  // =============================================================
  //   Api Calls
  // =============================================================

  //    ----------------Register a new Pharmacy --------------------

  const newPharmacy = async (branch, drugLicenseNo, ownerName, address) => {
    try {
      const res = await axios.post(`${host}/register`, {
        branch,
        drugLicenseNo,
        ownerName,
        address,
      });
      return res.data;
    } catch (error) {
      return "error";
    }
  };

  // -------------------- Get all pharmacy ------------------------
  const fetchAllPharmacies = async () => {
    try {
      const res = await axios.get(`${host}/get/all`);
      return res.data;
    } catch (error) {
      return "error";
    }
  };

//    -------------------Get a pharmacy ------------------
  const getPharmacy = async (pharmacyId) => {
    try {
      const res = axios.get(`${host}/find/${pharmacyId}`)
      return res
    } catch (error) {
      return 'error'
    }

  }

//    -----------------Delete a pharmacy --------------
  const deletePharmacy = async (pharmacyId) => {
      try {
          await axios.delete(`${host}/delete/${pharmacyId}`)
      } catch (error) {
          return 'error'
      }
  }

//    Update pharmacy Details

  const updatePharmacy = async (pharmacyId, branch, drugLicenseNo, ownerName, address) => {
      try {
          await axios.put(`${host}/update/${pharmacyId}`, { branch, drugLicenseNo, ownerName, address })
      } catch (error) {
        return error
      }
  }



  return (
    <pharmacyContext.Provider value={{ fetchAllPharmacies, newPharmacy, getPharmacy, deletePharmacy, updatePharmacy }}>
      {props.children}
    </pharmacyContext.Provider>
  );
};

export default PharmacyState;
