import { Add } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MedTable from "../../components/medicine/medTable/MedTable";
import Sidebar from "../../components/sidebar/Sidebar";
import medicineContext from "../../context/medicine/medicineContext";
import pharmacyContext from "../../context/pharmacy/pharmacyContext";
import "./medicines.scss";

const Medicines = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState(undefined);
  const [allMedicines, setAllMedicines] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  const { fetchAllMedicines } = useContext(medicineContext);
  const { fetchAllPharmacies } = useContext(pharmacyContext);

  useEffect(() => {
    const getAllLocations = async () => {
      const res = await fetchAllPharmacies();
      setLocationOptions(res);
    };
    getAllLocations();
  }, []);

  useEffect(() => {
    const getAllMedicines = async () => {
      const res = await fetchAllMedicines();
      if (res === "error") {
        navigate("/error");
      }
      if(location){
        setAllMedicines(res.filter(med=> med.location===location))
      }else{
        setAllMedicines(res);
      }
    };
    getAllMedicines();

  }, [location]);

  return (
    <div className="medicines">
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
              Medicine Database
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
                    e.target.value === 'All' ? setLocation('') : setLocation(e.target.value)
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
                placeholder="Search for a Medicine"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
              <a href="#">
                <img
                  className="search-icon"
                  src="/assets/search-icon.png"
                  alt=""
                />
              </a>
            </div>
            <div className="addButton">
              <Link to="/medicine/add">
                <Button variant="outlined">
                  <p>Add a new Medicine</p>
                  <Add />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bottom">
          <MedTable
            data={allMedicines}
            query={searchInput}
          />
        </div>
      </div>
    </div>
  );
};

export default Medicines;
