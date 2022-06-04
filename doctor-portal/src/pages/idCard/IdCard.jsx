import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./idCard.scss";

const IdCard = () => {
  const [reqUser, setReqUser] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("doc"));
    setReqUser(user);
  }, []);

  return (
    <>
      <Sidebar />

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
                src={reqUser ? reqUser.profilePic : "/assets/noDefaultPic.png"}
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
                      {reqUser
                        ? reqUser.phoneNumber
                        : "Phone Number Not Mentioned"}
                    </div>
                  </li>

                  <li>
                    <div className="tag">Registration Number :</div>
                    <div className="tagInfo">
                      {reqUser
                        ? reqUser.registrationNo
                        : "Registration No cannot be found"}
                    </div>
                  </li>

                  <li>
                    <div className="tag">Referal Id :</div>
                    <div className="tagInfo">
                      {reqUser ? reqUser.referalId : ""}
                    </div>
                  </li>

                  <li>
                    <div className="tag">Number Of Referals :</div>
                    <div className="tagInfo">
                      {reqUser && reqUser.referals
                        ? reqUser.referals.length
                        : ""}
                    </div>
                  </li>

                  <li>
                    <div className="tag">Percent Per Referal :</div>
                    <div className="tagInfo">
                      {reqUser ? reqUser.percentPerReferal : ""}
                    </div>
                  </li>

                  <li>
                    <div className="tag">Govt Id :</div>
                    <div className="tagInfo">
                      <a href={reqUser && reqUser.govtId}>
                        {reqUser && reqUser.govtId ? 'Click here' : ""}
                      </a>
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

export default IdCard;
