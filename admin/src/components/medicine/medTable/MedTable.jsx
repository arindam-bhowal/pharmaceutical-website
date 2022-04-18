import "./medTable.scss";
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
import { useContext, useEffect, useState } from "react";
import medicineContext from "../../../context/medicine/medicineContext";
import { Link, useNavigate } from "react-router-dom";



const MedTable = (props) => {

  const navigate = useNavigate()

  const { deleteMedicine } = useContext(medicineContext)

  const {data , query, location} = props

  const [reqData, setReqData] = useState([])
  
  return (
    <TableContainer component={Paper} className="medTable">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">Drug Name</TableCell>
          <TableCell className="tableCell">Manufacturer</TableCell>
          <TableCell className="tableCell">Expire Date</TableCell>
          <TableCell className="tableCell">Cost Price</TableCell>
          <TableCell className="tableCell">Selling Price</TableCell>
          <TableCell className="tableCell">Quantity</TableCell>
          <TableCell className="tableCell">Location</TableCell>
          <TableCell className="tableCell">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data
          .filter(med =>  med.location === location)
          .filter((user) => user.drugName.toLowerCase().includes(query))
          .map((row) => (
            <TableRow key={row._id}>
              
              <TableCell className="tableCell">{row.drugName}</TableCell>
              <TableCell className="tableCell">{row.manufacturer}</TableCell>
              <TableCell className="tableCell">{row.expireDate}</TableCell>
              <TableCell className="tableCell">{row.costPrice}</TableCell>
              <TableCell className="tableCell">{row.sellingPrice}</TableCell>
              <TableCell className="tableCell">{row.quantity}</TableCell>
              <TableCell className="tableCell">{row.location}</TableCell>
              <TableCell className="tableCell">
                <Link to={`/medicine/update/${row._id}`}>
                <ModeEditOutlineOutlined className="status edit" />
                </Link>
                <DeleteOutlineOutlined
                  className="status delete"
                  onClick={() => {
                    const res = deleteMedicine(row._id);
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
  );
};

export default MedTable;
