import "./stocks.scss";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import medicineContext from "../../../context/medicine/medicineContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import StockTable from "../stockTable/StockTable";
import checkoutContext from "../../../context/checkout/checkoutContext";

const Stocks = () => {

  const { setReqStocks} = useContext(checkoutContext)

  const [allMedicines, setAllMedicines] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [cart, setCart] = useState([]);

  const { fetchAllMedicines } = useContext(medicineContext);

  const navigate = useNavigate()

  useEffect(() => {
    const getAllMedicines = async () => {
      const res = await fetchAllMedicines();
      setAllMedicines(res);
    };
    getAllMedicines();
  }, []);


  const handleCheckout = () => {
    setReqStocks(cart)
    navigate('/checkout')
  }

  return (
    <div className="stocks">
      <div className="left">
        <Sidebar />
      </div>

      <div className="main">
        <div className="top">
          <div className="heading">
            <Typography variant="h2" component="h3">
              <p style={{ textAlign: "center" }}> Select Required Stocks</p>
            </Typography>
          </div>
          <div className="container">
            <div className="search-container">
              <input
                type="text"
                id="search-bar"
                placeholder="Search for Patients"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
              <a href="#">
                <img
                  className="search-icon"
                  src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
                />
              </a>
            </div>

            {/* <Link to='/patient/profile'> */}
            <div className="addButton">
              <span className="notification">{cart.length}</span>
              <div className="icon">
                <ShoppingCartOutlined style={{ fontSize: "2em" }} onClick={handleCheckout} />
              </div>
            </div>
            {/* </Link> */}
          </div>
        </div>
        <div className="bottom">
          <StockTable
            data={allMedicines}
            query={searchInput}
            cart={cart}
            setCart={setCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Stocks;
