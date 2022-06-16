import "./stocks.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import medicineContext from "../../../context/medicine/medicineContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@mui/icons-material";
import StockTable from "../stockTable/StockTable";
import checkoutContext from "../../../context/checkout/checkoutContext";
import pharmacyContext from "../../../context/pharmacy/pharmacyContext";

const Stocks = () => {
  const { reqPatient, setReqStocks } = useContext(checkoutContext);

  const [allMedicines, setAllMedicines] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("");

  const [locationOptions, setLocationOptions] = useState([])
  const [cart, setCart] = useState([]);

  const { fetchAllMedicines } = useContext(medicineContext);
  const { fetchAllPharmacies } = useContext(pharmacyContext)

  const navigate = useNavigate();

    // ----------------Location -----------------

    useEffect(() => {
      const getAllLocations = async () => {
        const res = await fetchAllPharmacies();
        setLocationOptions(res);
      };
      getAllLocations();
    }, []);

    //  -------------Fetch Medicines --------------

  useEffect(() => {
    const getAllMedicines = async () => {
      const res = await fetchAllMedicines();
      if (res === "error") {
        navigate("/error");
      }

      if (location) {
        setAllMedicines(res.filter((med) => med.location === location));
      } else {
        setAllMedicines(res);
      }
    };
    getAllMedicines();
  }, [location]);

  const handleCheckout = () => {
    setReqStocks(cart);
    if (cart.length !== 0) {
      navigate("/checkout");
    } else {
      alert("No Iteams Added to Cart");
    }
  };

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
            <div className="locationForm">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Location"
                  defaultValue="All"
                  onChange={(e) => {
                    e.target.value === "All"
                      ? setLocation("")
                      : setLocation(e.target.value);
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  {locationOptions.map((option) => (
                    <MenuItem key={option.drugLicenseNo} value={option.branch}>
                      {option.branch}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
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
                  src="/assets/search-icon.png"
                />
              </a>
            </div>

            {/* <Link to='/patient/profile'> */}
            <div className="addButton">
              <span className="notification">{cart.length}</span>
              <div className="icon">
                <ShoppingCartOutlined
                  style={{ fontSize: "2em" }}
                  onClick={reqPatient && handleCheckout}
                />
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
