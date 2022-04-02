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
import { useEffect } from "react";

const List = (props) => {

  const { data } = props;

  useEffect(() => {
    console.log(data)
  }, [])
  
  

  const rows = [
    {
      name: "Acer Nitro 5",
      profilePic:
        "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      email: "arindam@gmail.com",
      phoneNumber: "1 March",
      sex: 785,
      age: "Cash on Delivery",
      govtId:
        "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
    },
  ];

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
          {data.map((row) => (
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
                <ModeEditOutlineOutlined className="status edit" />
                <DeleteOutlineOutlined className="status delete" />
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
