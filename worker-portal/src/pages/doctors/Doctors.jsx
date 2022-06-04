import { Add } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import doctorContext from '../../context/doctor/doctorContext'
import DoctorTable from '../../components/doctors/doctorTable/DoctorTable'
import './doctors.scss'

const Workers = () => {

    const { fetchAllDoctors } = useContext(doctorContext)

    const navigate = useNavigate()

    const [searchInput, setSearchInput] = useState("")
    const [allDoctors, setallDoctors] = useState([])

    useEffect(() => {
        const getAllDoctors = async () => {
          const res = await fetchAllDoctors();
          if(res==='error'){
              navigate('/error')
          }
          setallDoctors(res.data)
          // console.log(res)
        };
        getAllDoctors();
      }, []);


  return (
    <div className="doctors">
    <div className="left">
      <Sidebar />
    </div>

    <div className="main">
      <div className="top">
        <div className="heading">
          <Typography variant="h2" component="h3" style={{textAlign: 'center'}}>
            Doctor's Database
          </Typography>
        </div>
        <div className="container">
          <div className="search-container">
            <input
              type="text"
              id="search-bar"
              placeholder="Search for Patients"
              onChange={(e)=>{setSearchInput(e.target.value.toLowerCase())}}
            />
            <a href="#">
              <img
                className="search-icon"
                src="/assets/search-icon.png"
                alt=''
              />
            </a>
          </div>
          <div className="addButton">
            <Link to='/doctor/create'>
            <Button variant="outlined">
              <p>Add Doctor</p>
              <Add />
            </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bottom">
        <DoctorTable data={allDoctors} query={searchInput} />
      </div>
    </div>
  </div>
  )
}

export default Workers