import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import "./payment.scss";

const Payment = () => {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="payment">

          <div className="pendingPayments">
              <h2 className="header">
                  Pending Payments
              </h2>
              <div className="wrapper">

                  {/* <span className="noPendingPayments">
                      No Pending Payments
                  </span> */}

                  <div className="card">
                      <div className="date">
                            26th March 2022
                      </div>
                      <div className="status pending">
                       &nbsp; Pending &nbsp;
                      </div>
                      <div className="payNow">
                          <Button variant="contained" className="btn" >
                              Pay Now
                          </Button>
                      </div>
                  </div>

              </div>
          </div>


          <div className="previousPayments">
              <h2 className="header">
                  Previous Payments
              </h2>
              <div className="wrapper">

                {/* <span className="noPreviousPayment">
                    No payment history found
                </span> */}

                    <div className="card">
                      <div className="date">
                            26th March 2022
                      </div>
                      <div className="status paid">
                       &nbsp; paid &nbsp;
                      </div>
                      <div className="download">
                          <Button variant="contained" className="btn" >
                              <Download />
                              <p>Download Invoice</p>
                          </Button>
                      </div>
                  </div>

              </div>
          </div>
        
      </div>
    </>
  );
};

export default Payment;
