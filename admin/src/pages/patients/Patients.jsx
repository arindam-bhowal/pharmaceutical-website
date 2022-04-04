import "./patients.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import patientContext from "../../context/patient/patientContext";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Patients = () => {
  const [allPatients, setAllPatients] = useState([]);
  const [searchInput, setSearchInput] = useState("")

  const { fetchAllPatients } = useContext(patientContext);
  

  useEffect(() => {
    const getAllPatients = async () => {
      const res = await fetchAllPatients();
      setAllPatients(res);
    };
    getAllPatients();
  }, []);

  return (
    <div className="patients">
      <div className="left">
        <Sidebar />
      </div>

      <div className="main">
        <div className="top">
          <div className="heading">
            <Typography variant="h2" component="h3">
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
                  // value={age}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem >Borpeta</MenuItem>
                  <MenuItem >Guwahati</MenuItem>
                  <MenuItem >Majuli</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="search-container">
              <input
                type="text"
                id="search-bar"
                placeholder="Search for Patients"
                onChange={(e)=>{setSearchInput(e.target.value)}}
              />
              <a href="#">
                <img
                  className="search-icon"
                  src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
                />
              </a>
            </div>
            <div className="addButton">
              <Link to='/patient/profile'>
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
