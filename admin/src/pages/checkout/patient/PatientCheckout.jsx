import "./patientCheckout.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import patientContext from "../../../context/patient/patientContext";
import PatientTable from "../patientTable/PatientTable";
import Sidebar from "../../../components/sidebar/Sidebar";
import pharmacyContext from "../../../context/pharmacy/pharmacyContext";

const PatientCheckout = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("");
  const [pharmacyOptions, setPharmacyOptions] = useState([]);

  const { fetchAllPatients } = useContext(patientContext);
  const { fetchAllPharmacies } = useContext(pharmacyContext);

  useEffect(() => {
    const getAllPatients = async () => {
      const res = await fetchAllPatients();
      if (location) {
        setAllPatients(res.filter((patient) => patient.location === location));
      } else {
        setAllPatients(res);
      }
    };
    getAllPatients();
  }, [location]);

  //  To fetch Location Options
  useEffect(() => {
    const getAllLocations = async () => {
      const res = await fetchAllPharmacies();
      setPharmacyOptions(res);
    };
    getAllLocations();
  }, []);

  return (
    <div className="patientCheckout">
      <div className="left">
        <Sidebar />
      </div>

      <div className="main">
        <div className="top">
          <div className="heading">
            <Typography
              variant="h2"
              component="h3"
              style={{ textAlign: "center" }}
            >
              <p> Welcome to Checkout Page</p>
              <p style={{ textAlign: "center", color: "red" }}>
                {" "}
                Select Patient{" "}
              </p>
            </Typography>
          </div>
          <div className="container">
            <div className="locationForm">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Location"
                  defaultValue="All"
                  onChange={(e) => {
                    e.target.value === "All"
                      ? setLocation("")
                      : setLocation(e.target.value);
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  {pharmacyOptions.map((pharmacy) => {
                    return (
                      <MenuItem key={pharmacy._id} value={pharmacy.branch}>
                        {pharmacy.branch}
                      </MenuItem>
                    );
                  })}

                  {/* <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Guwahati">Guwahati</MenuItem>
                  <MenuItem value="Borpeta">Borpeta</MenuItem>
                  <MenuItem value="Majuli">Majuli</MenuItem> */}
                </Select>
              </FormControl>
            </div>
            <div className="search-container">
              <input
                type="text"
                id="search-bar"
                placeholder="Search for Patients"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
              <img
                className="search-icon"
                src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
              />
            </div>
          </div>
        </div>
        <div className="bottom">
          <PatientTable data={allPatients} query={searchInput} />
        </div>
      </div>
    </div>
  );
};

export default PatientCheckout;
