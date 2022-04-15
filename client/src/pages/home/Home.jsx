import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";
import axios from "axios";

const Home = () => {

  const [referalId, setReferalId] = useState();
  const [referedBy, setReferedBy] = useState([])

  const navigate = useNavigate();

  useEffect(() => {

    const reqUser = JSON.parse(localStorage.getItem('user'))

    if(reqUser.referedBy){
      setReferalId(reqUser.referedBy)
    }

    const getReferedPerson = async () => {
      if(referalId){
          const res = await axios.get(
            `http://localhost:8801/api/worker/referedBy/${referalId}`
          );
          setReferedBy(res.data);
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

              {
                  referedBy && (
            <div className="referalInfo" style={{ textAlign: "right" }}>
              <h4>Reffered By - {referedBy.name}</h4>
              <h5>Email - {referedBy.email} </h5>
              <h5>Contact No- +91 {referedBy.phoneNumber}</h5>
            </div>
                  )
              }
            

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
