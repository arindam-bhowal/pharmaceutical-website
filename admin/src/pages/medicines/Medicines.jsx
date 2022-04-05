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
import "./medicines.scss";

const Medicines = () => {

    const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("Guwahati");
  const [allMedicines, setAllMedicines] = useState([])

  const { fetchAllMedicines } = useContext(medicineContext)

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
    if(allMedicines) {
        const filteredArray = allMedicines.filter(medicine => medicine.location == location)
        setAllMedicines(filteredArray)
        console.log(location)
    }
  };

  useEffect(() => {
    const getAllMedicines = async () => {
        const res = await fetchAllMedicines()
        if(res === 'error'){
            navigate('/error')
        }
        setAllMedicines(res)
    }
    getAllMedicines()
  }, [])
  

  return (
    <div className="medicines">
      <div className="left">
        <Sidebar />
      </div>

      <div className="main">
        <div className="top">
          <div className="heading">
            <Typography variant="h2" component="h3">
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
                  defaultValue='Guwahati'
                  onChange={handleChangeLocation}
                >
                    <MenuItem value="Guwahati">Guwahati</MenuItem>
                  <MenuItem value="Borpeta">Borpeta</MenuItem>
                  <MenuItem value="Majuli">Majuli</MenuItem>
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
              <a href="#">
                <img
                  className="search-icon"
                  src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
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
          <MedTable data={allMedicines} query={searchInput} />
        </div>
      </div>
    </div>
  );
};

export default Medicines;
