import "./table.scss";
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
import { useContext } from "react";
import patientContext from "../../context/patient/patientContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const List = (props) => {
  const { data, query } = props;

  const { deletePatient } = useContext(patientContext);

  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">E-mail</TableCell>
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
                    <img src={row.profilePic} alt="" className="image" />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.email}</TableCell>
                {/* <TableCell className="tableCell">{row.email}</TableCell> */}
                <TableCell className="tableCell">{row.phoneNumber}</TableCell>
                <TableCell className="tableCell">{row.sex}</TableCell>
                <TableCell className="tableCell">{row.age}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row.govtId} alt="" className="image" />
                  </div>
                </TableCell>
                <TableCell className="tableCell">
                  {/* <span className={`status ${row.status}`}>{row.status}</span> */}
                  <Link to={`/patient/update/${row._id}`}>
                  <ModeEditOutlineOutlined className="status edit" />
                  </Link>
                  <DeleteOutlineOutlined
                    className="status delete"
                    onClick={() => {
                      deletePatient(row._id);
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

export default List;
