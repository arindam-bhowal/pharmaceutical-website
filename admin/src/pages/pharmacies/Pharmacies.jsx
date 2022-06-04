import './pharmacies.scss'
import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import PharmacyTable from '../../components/pharmacy/pharmacyTable/PharmacyTable'
import pharmacyContext from '../../context/pharmacy/pharmacyContext';

const Pharmacies = () => {
    const [searchInput, setSearchInput] = useState("")
    const [allPharmacies, setAllPharmacies] = useState([])

    const { fetchAllPharmacies } = useContext(pharmacyContext)

    useEffect(() => {
      const getAllPharmacies = async() => {
          const res = await fetchAllPharmacies()
          setAllPharmacies(res)
      }
      getAllPharmacies()
    }, [])
    

  return (
    <div className="pharmacies">
      <div className="left">
        <Sidebar />
      </div>
      <div className="main">
      <div className="top">
          <div className="heading">
            <Typography variant="h2" component="h3" style={{textAlign: 'center'}}>
              All Pharmacies Details
            </Typography>
          </div>
          <div className="container">
            <div className="locationForm">
             
            </div>
            <div className="search-container">
              <input
                type="text"
                id="search-bar"
                placeholder="Search for a Pharmacy with Owner Name"
                onChange={(e)=>{setSearchInput(e.target.value)}}
              />
                <img
                  className="search-icon"
                  src="/assets/search-icon.png"
                  alt=""
                />
            </div>
            <div className="addButton">
              <Link to='/pharmacy/create'>
              <Button variant="outlined">
                <p>Add a new Pharmacy</p>
                <Add />
              </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bottom">
          {/* <Table data={allPatients} query={searchInput} /> */}
          <PharmacyTable data={allPharmacies} query={searchInput} />
        </div>


      </div>
    </div>
  );
};

export default Pharmacies;
