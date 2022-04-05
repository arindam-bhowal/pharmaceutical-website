import { ArrowBack } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import medicineContext from "../../../context/medicine/medicineContext";
import "./updateMed.scss";

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
  const [quantity, setQuantity] = useState();
  const [location, setLocation] = useState("");

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
            <input
              type="date"
              tabIndex="2"
              defaultValue={reqMedicine && reqMedicine.expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              required
            />
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
              placeholder="Quantity"
              type="number"
              defaultValue={reqMedicine && reqMedicine.quantity}
              onChange={(e) => setQuantity(e.target.value)}
              tabIndex="2"
              required
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Location"
              type="text"
              defaultValue={reqMedicine && reqMedicine.location}
              onChange={(e) => setLocation(e.target.value)}
              tabIndex="2"
              required
            />
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
