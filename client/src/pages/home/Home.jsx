import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [referalId, setReferalId] = useState();
  const [referedBy, setReferedBy] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const reqUser = JSON.parse(localStorage.getItem("user"));

    if (reqUser.referedBy) {
      setReferalId(reqUser.referedBy);
    }

    const getReferedPerson = async () => {
      console.log(referalId[0]);
      if (referalId) {
        if (referalId[0] === "d") {
          const res = await axios.get(
            `http://localhost:8801/api/doctor/referedBy/${referalId}`
          );
          res && setReferedBy(res.data);
        }
        const res = await axios.get(
          `http://localhost:8801/api/worker/referedBy/${referalId}`
        );
        res && setReferedBy(res.data);
      }
    };
    getReferedPerson();
  }, [referalId]);

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="bdy">
        <div className="home">
          <section className="left-sec">
            <h2> We Are Here For Your Care</h2>
            <h1> We The Best Doctors</h1>
            <p>We are here for your care 24/7. Any help just call us.</p>
            <Button
              variant="contained"
              size="large"
              className="btn"
              onClick={() => navigate("/appointment")}
            >
              Make an appointment
            </Button>
          </section>
          <section className="right-sec">
            {referedBy.name && (
              <div className="referalInfo" style={{ textAlign: "right" }}>
                <h4>Reffered By - {referedBy.name}</h4>
                <h5>Email - {referedBy.email} </h5>
                <h5>Contact No- +91 {referedBy.phoneNumber}</h5>
              </div>
            )}

            <figure>
              <img src="assets/home-bg.png" alt="" />
            </figure>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
