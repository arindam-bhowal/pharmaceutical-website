import "./patients.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/patients/table/Table";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import patientContext from "../../context/patient/patientContext";
import pharmacyContext from "../../context/pharmacy/pharmacyContext";

const Patients = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);

  const { fetchAllPatients } = useContext(patientContext);
  const { fetchAllPharmacies } = useContext(pharmacyContext);

  // ----------------Location -----------------

  useEffect(() => {
    const getAllLocations = async () => {
      const res = await fetchAllPharmacies();
      setLocationOptions(res);
    };
    getAllLocations();
  }, []);

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

  return (
    <div className="patients">
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
              Patient's Database
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
                  {locationOptions.map((option) => (
                    <MenuItem key={option.drugLicenseNo} value={option.branch}>
                      {option.branch}
                    </MenuItem>
                  ))}
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
                alt=""
              />
            </div>
            <div className="addButton">
              <Link to="/patient/create">
                <Button variant="outlined">
                  <p>Add a Patient</p>
                  <Add />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bottom">
          <Table data={allPatients} query={searchInput} />
        </div>
      </div>
    </div>
  );
};

export default Patients;
