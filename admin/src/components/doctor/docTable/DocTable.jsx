import './docTable.scss'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  ModeEditOutlineOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from 'react';
import doctorContext from "../../../context/doctor/doctorContext";



const DocTable = (props) => {
    const {deleteDoctor} = useContext(doctorContext)

    const { data, query } = props;

    const navigate = useNavigate()


  return (
    <TableContainer component={Paper} className="docTable">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">Name</TableCell>
          <TableCell className="tableCell">E-mail</TableCell>
          <TableCell className="tableCell">Registration Number</TableCell>
          <TableCell className="tableCell">Phone Number</TableCell>
          <TableCell className="tableCell">Sex</TableCell>
          <TableCell className="tableCell">Age</TableCell>
          <TableCell className="tableCell">Identity</TableCell>
          <TableCell className="tableCell">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data
          .filter((user) => user.name.toLowerCase().includes(query))
          .map((row) => (
            <TableRow key={row.email}>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <a href={row.profilePic} target='_blank' rel="noreferrer">
                  <img src={row.profilePic? row.profilePic : '/assets/noProfilePic.png'} alt="" className="image" />
                  </a>
                  {row.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">{row.registrationNo}</TableCell>
              {/* <TableCell className="tableCell">{row.email}</TableCell> */}
              <TableCell className="tableCell">{row.phoneNumber}</TableCell>
              <TableCell className="tableCell">{row.sex}</TableCell>
              <TableCell className="tableCell">{row.age}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <a href={row.govtId} target='_blank' rel="noreferrer">
                  <img src={row.govtId ? row.govtId : '/assets/noIdProof.png'} alt="" className="image" />
                  </a>
                </div>
              </TableCell>
              <TableCell className="tableCell">
                {/* <span className={`status ${row.status}`}>{row.status}</span> */}
                <Link to={`/doctor/update/${row._id}`}>
                <ModeEditOutlineOutlined className="status edit" />
                </Link>

                 <DeleteOutlineOutlined
                    className="status delete"
                    onClick={() => {
                      const res=deleteDoctor(row._id);
                      if(res==='error'){
                          navigate('/error')
                      }
                      navigate(0)
                    }}
                  />
                {/* Approved and pending */}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default DocTable