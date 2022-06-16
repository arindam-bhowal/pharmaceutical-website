import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./about.scss";

const About = () => {
  const [reqUser, setReqUser] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setReqUser(user);
  }, []);

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="idCard">
        <div>
          <div className="bg-grid-line" />
          <div className="card">
            <header>
              <h1>ID Card</h1>
            </header>
            <article>
              <img
                alt="My Pic"
                id="thumb"
                src={reqUser && (reqUser.profilePic ? reqUser.profilePic : "/assets/defaultProfilePic.png")}
                style={{ objectFit: "cover" }}
              />
              {/* <h2>  </h2> */}
              <div className="area">
                <ul>
                  <li>
                    <div className="tag">Name :</div>
                    <div className="tagInfo">
                      {reqUser ? reqUser.name : "No Name"}
                    </div>
                  </li>

                  <li>
                    <div className="tag">Age :</div>
                    <div className="tagInfo">
                      {reqUser ? reqUser.age : "Age Not Mentioned"}
                    </div>
                  </li>

                  <li>
                    <div className="tag">Sex :</div>
                    <div className="tagInfo">
                      {reqUser ? reqUser.sex : "Sex Not Mentioned"}
                    </div>
                  </li>

                  <li>
                    <div className="tag">Email :</div>
                    <div className="tagInfo">
                      {reqUser ? reqUser.email : "Email Not Mentioned"}
                    </div>
                  </li>

                  <li>
                    <div className="tag">Phone Number :</div>
                    <div className="tagInfo">
                      {reqUser ? reqUser.phoneNumber : "Phone Number Not Mentioned"}
                    </div>
                  </li>

                  <li>
                    <div className="tag">Location :</div>
                    <div className="tagInfo">
                      {reqUser ? reqUser.location : "Location Not Mentioned"}
                    </div>
                  </li>

                  <li>
                    <div className="tag">GovtId :</div>
                    <div classNareme="tagInfo">
                      {reqUser ? (<a href={reqUser.govtId}>Click Here to view</a>): ""}
                    </div>
                  </li>

                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
