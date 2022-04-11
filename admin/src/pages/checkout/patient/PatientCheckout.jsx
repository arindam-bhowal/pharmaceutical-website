import './patientCheckout.scss'
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Add, ArrowRightAlt } from "@mui/icons-material";
import { Link } from "react-router-dom";
import patientContext from '../../../context/patient/patientContext';
import PatientTable from '../patientTable/PatientTable';
import Sidebar from '../../../components/sidebar/Sidebar';

const PatientCheckout = () => {
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
    <div className="patientCheckout">
      <div className="left">
        <Sidebar />
      </div>

      <div className="main">
        <div className="top">
          <div className="heading">
            <Typography variant="h2" component="h3">
             <p> Welcome to Checkout Page</p>
             <p style={{textAlign: 'center', color: 'red'}}> Select Patient </p>
            </Typography>
          </div>
          <div className="container">
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
            {/* <div className="addButton"> */}
              {/* <Link to='/patient/profile'>
              <Button variant="outlined">
                <p>Add a Patient</p>
                <Add />
              </Button>
              </Link> */}
            {/* </div> */}
          </div>
        </div>
        <div className="bottom">
          <PatientTable data={allPatients} query={searchInput} />
        </div>
      </div>
    </div>
  )
}

export default PatientCheckout