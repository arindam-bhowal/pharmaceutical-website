import { Add } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import WorkerTable from '../../components/worker/workerTable/WorkerTable'
import workerContext from '../../context/worker/workerContext'
import './workers.scss'

const Workers = () => {

    const { fetchAllWorkers } = useContext(workerContext)

    const navigate = useNavigate()

    const [searchInput, setSearchInput] = useState("")
    const [allWorkers, setAllWorkers] = useState([])

    useEffect(() => {
        const getAllWorkers = async () => {
          const res = await fetchAllWorkers();
          if(res==='error'){
              navigate('/error')
          }
          setAllWorkers(res);
        };
        getAllWorkers();
      }, []);


  return (
    <div className="workers">
    <div className="left">
      <Sidebar />
    </div>

    <div className="main">
      <div className="top">
        <div className="heading">
          <Typography variant="h2" component="h3" style={{textAlign: 'center'}}>
            Worker's Database
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
                src="assets/search-icon.png"
                alt=''
              />
            </a>
          </div>
          <div className="addButton">
            <Link to='/worker/create'>
            <Button variant="outlined">
              <p>Add Worker</p>
              <Add />
            </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bottom">
        <WorkerTable data={allWorkers} query={searchInput} />
      </div>
    </div>
  </div>
  )
}

export default Workers