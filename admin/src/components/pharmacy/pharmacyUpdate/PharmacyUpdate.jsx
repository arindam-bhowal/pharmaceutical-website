import "./pharmacyUpdate.scss";
import { ArrowBack } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pharmacyContext from "../../../context/pharmacy/pharmacyContext";

const PharmacyUpdate = () => {
  const navigate = useNavigate();
  const { pharmacyId } = useParams();
  const { updatePharmacy, getPharmacy } = useContext(pharmacyContext);

  const [branch, setBranch] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [drugLicenseNo, setDrugLicenseNo] = useState("");
  const [address, setAddress] = useState("");

  const [reqPharmacy, setReqPharmacy] = useState([]);

  useEffect(() => {
    const fetchPharmacy = async () => {
       const res = await getPharmacy(pharmacyId)
       if(res==='error'){
           navigate('/error')
       }
       setReqPharmacy(res.data)
    }
    fetchPharmacy();
  }, []);

  useEffect(() => {
    if (reqPharmacy) {
      setBranch(reqPharmacy.branch);
      setOwnerName(reqPharmacy.ownerName);
      setDrugLicenseNo(reqPharmacy.drugLicenceNumber);
      setAddress(reqPharmacy.address);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePharmacy(pharmacyId, branch, drugLicenseNo, ownerName, address);
    navigate('/pharmacies')
  };

  return (
    <div className="pharmacyUpdate">
      <div className="container">
        <form id="contact" action="" method="post" onSubmit={handleSubmit}>
          <div className="header">
            <ArrowBack
              style={{ cursor: "pointer" }}
              onClick={() => navigate(-1)}
            />
          </div>
          <h3>Update Pharmacy Details</h3>
          <fieldset>
            <input
              placeholder="Branch"
              type="text"
              tabIndex="1"
              defaultValue={reqPharmacy && reqPharmacy.branch}
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
              defaultValue={reqPharmacy && reqPharmacy.ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
              autoFocus
            />
          </fieldset>

          <fieldset>
            <input
              placeholder="Pharmacy Licence Number"
              type="text"
              tabIndex="1"
              defaultValue={reqPharmacy && reqPharmacy.drugLicenseNo}
              onChange={(e) => setDrugLicenseNo(e.target.value)}
              required
              autoFocus
            />
          </fieldset>

          <fieldset>
            <textarea
              placeholder="Address"
              tabIndex="1"
              defaultValue={reqPharmacy && reqPharmacy.address}
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
              Update
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PharmacyUpdate;
