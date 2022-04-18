import { ArrowBack } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import medicineContext from "../../../context/medicine/medicineContext";
import DatePicker from 'react-date-picker';
import "./medProfile.scss";

const MedProfile = () => {
  const { newMedicine } = useContext(medicineContext);

  const [drugName, setDrugName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [expireDate, setExpireDate] = useState();
  const [costPrice, setCostPrice] = useState();
  const [sellingPrice, setSellingPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [location, setLocation] = useState("");
  
  const [date, setDate] = useState(new Date())

  const navigate = useNavigate();

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
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    await newMedicine(
      drugName,
      manufacturer,
      expireDate,
      costPrice,
      sellingPrice,
      quantity,
      location
    );
    navigate("/medicines");
  };

  return (
    <div className="medProfile">
      <div className="container">
        <form id="contact" action="" method="post" onSubmit={handleSubmit}>
          <div className="header">
            <ArrowBack
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </div>
          <h3>Add Medicine Details</h3>
          <fieldset>
            <input
              placeholder="Drug Name"
              type="text"
              tabIndex="1"
              onChange={(e) => setDrugName(e.target.value)}
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Manufacturer"
              type="text"
              onChange={(e) => setManufacturer(e.target.value)}
              tabIndex="2"
            />
          </fieldset>
          <fieldset>
            <label>Expire Date</label>
            <DatePicker onChange={setDate} value={date} className='expireDate' />
          </fieldset>
          <fieldset>
            <input
              placeholder="Cost Price"
              type="number"
              onChange={(e) => setCostPrice(e.target.value)}
              tabIndex="2"
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Selling Price"
              type="number"
              onChange={(e) => setSellingPrice(e.target.value)}
              tabIndex="2"
              required
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Quantity"
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              tabIndex="2"
              required
            />
          </fieldset>
          <fieldset>
          <select
               onChange={(e) => {
                e.target.value !== "location" && setLocation(e.target.value);
              }}
                required
              >
                {options.map((option) => (
              <option key={option.value} value={option.value} >{option.label}</option>
            ))}
              </select>
          </fieldset>
          <fieldset>
            <button
              name="submit"
              type="submit"
              id="contact-submit"
              data-submit="...Sending"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default MedProfile;
