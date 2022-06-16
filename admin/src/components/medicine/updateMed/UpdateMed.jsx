import { ArrowBack } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import medicineContext from "../../../context/medicine/medicineContext";
import DatePicker from 'react-date-picker';
import "./updateMed.scss";
import { MenuItem, Select } from "@mui/material";
import pharmacyContext from "../../../context/pharmacy/pharmacyContext";

const UpdateMed = () => {
  const navigate = useNavigate();

  const { updateMedicine, getMedicine } = useContext(medicineContext);

  const { medicineId } = useParams();

  const [reqMedicine, setReqMedicine] = useState([]);

  const [drugName, setDrugName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [expireDate, setExpireDate] = useState();
  const [costPrice, setCostPrice] = useState();
  const [sellingPrice, setSellingPrice] = useState();
  const [discount, setDiscount] = useState()
  const [quantity, setQuantity] = useState();
  const [location, setLocation] = useState("");

  const [date, setDate] = useState(new Date())

  const { fetchAllPharmacies } = useContext(pharmacyContext);
  const [locationOptions, setLocationOptions] = useState([]);
  useEffect(() => {
    const getAllLocations = async () => {
      const res = await fetchAllPharmacies();
      setLocationOptions(res);
    };
    getAllLocations();
  }, []);

  const options = [
    {
      label: "Location",
      value: "location",
    },
    {
      label: "Guwahati",
      value: "Guwahati",
    },
    {
      label: "Majuli",
      value: "Majuli",
    },
    {
      label: "Borpeta",
      value: "Borpeta",
    }
  ];

  useEffect(() => {
    const reqDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    setExpireDate(reqDate)
  }, [date])

  useEffect(() => {
    const fetchMedicine = async () => {
      const res = await getMedicine(medicineId);
      if (res === "error") {
        navigate("/error");
      }
      setReqMedicine(res.data);
    };
    fetchMedicine();
  }, []);

  useEffect(() => {
    if(reqMedicine){
      setDrugName(reqMedicine.drugName)
      setManufacturer(reqMedicine.manufacturer)
      setExpireDate(reqMedicine.expireDate)
      setCostPrice(reqMedicine.costPrice)
      setSellingPrice(reqMedicine.sellingPrice)
      setDiscount(reqMedicine.discount)
      setQuantity(reqMedicine.quantity)
      setLocation(reqMedicine.location)
    }
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMedicine(
      medicineId,
      drugName,
      manufacturer,
      expireDate,
      costPrice,
      sellingPrice,
      discount,
      quantity,
      location
    );
    navigate("/medicines");
  };

  return (
    <div className="updateMed">
      <div className="container">
        <form id="contact" action="" method="post" onSubmit={handleSubmit}>
          <div className="header">
            <ArrowBack
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </div>
          <h3>Update Medicine Details</h3>
          <fieldset>
            <input
              placeholder="Drug Name"
              type="text"
              tabIndex="1"
              defaultValue={reqMedicine && reqMedicine.drugName}
              onChange={(e) => setDrugName(e.target.value)}
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Manufacturer"
              type="text"
              defaultValue={reqMedicine && reqMedicine.manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              tabIndex="2"
            />
          </fieldset>
          <fieldset>
            <label>Expire Date</label>
            <DatePicker onChange={setDate} value={expireDate ? expireDate : date} className='expireDate' />
          </fieldset>
          <fieldset>
            <input
              placeholder="Cost Price"
              type="number"
              defaultValue={reqMedicine && reqMedicine.costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              tabIndex="2"
            />
          </fieldset>
          
          <fieldset>
            <input
              placeholder="Selling Price"
              type="number"
              defaultValue={reqMedicine && reqMedicine.sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              tabIndex="2"
              required
            />
          </fieldset>

          <fieldset>
            <input
              placeholder="Discount"
              type="number"
              defaultValue={reqMedicine && reqMedicine.discount}
              onChange={(e) => setDiscount(e.target.value)}
              tabIndex="2"
              required
            />
          </fieldset>

          <fieldset>
            <input
              placeholder="Quantity"
              type="number"
              defaultValue={reqMedicine && reqMedicine.quantity}
              onChange={(e) => setQuantity(e.target.value)}
              tabIndex="2"
              required
            />
          </fieldset>
          <fieldset>
          <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Location"
                  defaultValue="All"
                  onChange={(e) => {
                    e.target.value === 'All' ? setLocation('') : setLocation(e.target.value)
                  }}
                >
                  <MenuItem value="All">Location</MenuItem>
                  {locationOptions.map((option) => (
                    <MenuItem key={option.drugLicenseNo} value={option.branch}>
                      {option.branch}
                    </MenuItem>
                  ))}
                </Select>
          </fieldset>
          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
            >
              Update
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateMed;
