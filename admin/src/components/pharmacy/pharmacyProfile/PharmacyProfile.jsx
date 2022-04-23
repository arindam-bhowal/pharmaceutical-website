import "./pharmacyProfile.scss";
import { ArrowBack } from "@mui/icons-material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import pharmacyContext from "../../../context/pharmacy/pharmacyContext";

const PharmacyProfile = () => {
  const navigate = useNavigate();

  const { newPharmacy } = useContext(pharmacyContext);

  const [branch, setBranch] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [drugLicenceNumber, setDrugLicenceNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await newPharmacy(branch, drugLicenceNumber, ownerName, address);
    navigate("/pharmacies");
  };

  return (
    <div className="pharmacyProfile">
      <div className="container">
        <form id="contact" action="" method="post" onSubmit={handleSubmit}>
          <div className="header">
            <ArrowBack
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </div>
          <h3>Add Pharmacy Details</h3>

          <fieldset>
            <input
              placeholder="Branch"
              type="text"
              tabIndex="1"
              onChange={(e) => setBranch(e.target.value)}
              required
              autoFocus
            />
          </fieldset>

          <fieldset>
            <input
              placeholder="Owner Name"
              type="text"
              tabIndex="1"
              onChange={(e) => setOwnerName(e.target.value)}
              required
              autoFocus
            />
          </fieldset>

          <fieldset>
            <input
              placeholder="Drug Licence"
              type="text"
              tabIndex="1"
              onChange={(e) => setDrugLicenceNumber(e.target.value)}
              required
              autoFocus
            />
          </fieldset>

          <fieldset>
            <textarea
              placeholder="Address"
              type="text"
              tabIndex="1"
              onChange={(e) => setAddress(e.target.value)}
              required
              autoFocus
            />
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

export default PharmacyProfile;
