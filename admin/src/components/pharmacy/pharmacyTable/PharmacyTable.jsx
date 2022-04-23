import "./pharmacyTable.scss";
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
import pharmacyContext from "../../../context/pharmacy/pharmacyContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const List = (props) => {
  const { data, query } = props;

  const { deletePharmacy } = useContext(pharmacyContext);

  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Branch</TableCell>
            <TableCell className="tableCell">Drug-Licence Number</TableCell>
            <TableCell className="tableCell">Owner Name</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data
            .filter((user) => user.ownerName.toLowerCase().includes(query))
            .map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row.branch}</TableCell>
                <TableCell className="tableCell">{row.drugLicenseNo}</TableCell>
                <TableCell className="tableCell">{row.ownerName}</TableCell>
                <TableCell className="tableCell">{row.address}</TableCell>

                <TableCell className="tableCell">
                  <Link to={`/pharmacy/update/${row._id}`}>
                    <ModeEditOutlineOutlined className="status edit" />
                  </Link>
                  <DeleteOutlineOutlined
                    className="status delete"
                    onClick={() => {
                      deletePharmacy(row._id);
                      navigate(0);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
