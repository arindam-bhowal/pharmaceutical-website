import "./history.scss";
import Navbar from "../../components/navbar/Navbar";
import { FileCopy, FileDownload } from '@mui/icons-material';

const History = () => {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="history">
        <h1 className="heading">History</h1>
        <div className="historyCards">
          <div className="wrapper">

            {/* <h1 style={{textAlign: 'center', color: 'purple'}}>
              No Previous Info Found
            </h1> */}

              <div className="card">
                <div className="icon">
                  <FileCopy className="cardIcon" />
                </div>

                <div className="details">
                  <div className="date">
                    26 April 2022
                  </div>
                  <div className="download">
                    Download Prescription now
                  </div>
                </div>

                <div className="icon download">
                  <FileDownload className="cardIcon" />
                </div>
              </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default History;
