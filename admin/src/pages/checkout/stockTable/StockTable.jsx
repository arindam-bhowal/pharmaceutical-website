import "./stockTable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Add, Remove } from "@mui/icons-material";
import checkoutContext from "../../../context/checkout/checkoutContext";
import { useBeforeunload } from "react-beforeunload";
import { useContext } from "react";

const StockTable = (props) => {
  const { reqPatient } = useContext(checkoutContext);

  const { data, query, cart, setCart } = props;

  useBeforeunload((event) => {
    if (reqPatient !== "") {
      event.preventDefault();
    }
  });

  const handleAddition = (id, amount) => {
    let newArray = [];
    const res = cart.find((item) => item.stockId === id);
    if (res === undefined) {
      setCart((cart) => [...cart, { stockId: id, quantity: 1 }]);
    } else {
      newArray = [...cart];
      newArray.forEach((item) => {
        if (item.stockId === id && item.quantity < amount) {
          item.quantity++;
        }
      });
      setCart(newArray);
    }
  };

  const handleDeletion = (id) => {
    let newArray = [];
    const res = cart.find((item) => item.stockId === id);
    if (res !== undefined && res.quantity !== 0) {
      newArray = [...cart];
      newArray.forEach((item) => {
        if (item.stockId === id && item.quantity > 0) {
          item.quantity--;
        }
      });
      setCart(newArray);
    }
    if (res !== undefined && res.quantity === 0) {
      newArray = [...cart];
      setCart(newArray.filter((item) => item.stockId !== id));
    }
  };

  return (
    <TableContainer component={Paper} className="stockTable">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Drug Name</TableCell>
            <TableCell className="tableCell">Manufacturer</TableCell>
            <TableCell className="tableCell">Expire Date</TableCell>
            <TableCell className="tableCell">Cost Price</TableCell>
            <TableCell className="tableCell">Selling Price</TableCell>
            <TableCell className="tableCell">Discount</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Location</TableCell>
            <TableCell className="tableCell">Add to cart</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .filter((user) => user.drugName.toLowerCase().includes(query))
            .map((row) => {
              return (
                <TableRow key={row._id}>
                  <TableCell className="tableCell">{row.drugName}</TableCell>
                  <TableCell className="tableCell">
                    {row.manufacturer}
                  </TableCell>
                  <TableCell className="tableCell">{row.expireDate}</TableCell>
                  <TableCell className="tableCell">{row.costPrice}</TableCell>
                  <TableCell className="tableCell">
                    {row.sellingPrice}
                  </TableCell>
                  <TableCell className="tableCell">{row.discount}</TableCell>
                  <TableCell className="tableCell">{row.quantity}</TableCell>
                  <TableCell className="tableCell">{row.location}</TableCell>
                  <TableCell className="tableCell">
                    {/* <Add className="icon status add" onClick={()=>{setCartItem(cartItem => [...cartItem, row._id])}} /> */}
                    <Add
                      className="icon status add"
                      onClick={() => handleAddition(row._id, row.quantity)}
                    />
                    <span className="status quantity">
                      {cart.find((item) => item.stockId === row._id)
                        ? cart.find((item) => item.stockId === row._id).quantity
                        : 0}
                    </span>
                    <Remove
                      className="icon status remove"
                      onClick={() => handleDeletion(row._id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTable;
