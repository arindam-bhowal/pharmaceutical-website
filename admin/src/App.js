import Dashboard from "./pages/dashboard/Dashboard";
import Patients from "./pages/patients/Patients";
import "./app.scss";
import Profile from "./components/profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import Medicines from "./pages/medicines/Medicines";
import Error from "./pages/error/Error";
import MedProfile from "./components/medicine/medProfile/MedProfile";
import UpdateMed from "./components/medicine/updateMed/UpdateMed";
import Doctor from "./pages/doctors/Doctor";
import DocProfile from "./components/doctor/docProfile/DocProfile";
import UpdateDoc from "./components/doctor/updateDoc/UpdateDoc";
import Workers from "./pages/workers/Workers";
import WorkerProfile from "./components/worker/workerProfile/WorkerProfile";
import PatientCheckout from "./pages/checkout/patient/PatientCheckout";
import Stocks from "./pages/checkout/stocks/Stocks";
import Checkout from "./pages/checkout/Checkout";
import UpdateWorker from "./components/worker/updateWorker/UpdateWorker";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/profile" element={<Profile />} />
        <Route path="/patient/update/:patientId" element={<UpdateProfile />} />

        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctor/create" element={<DocProfile />} />
        <Route path="/doctor/update/:doctorId" element={<UpdateDoc />} />

        <Route path="/workers" element={<Workers />} />
        <Route path="/worker/create" element={<WorkerProfile />} />
        <Route path="/worker/update/:workerId" element={<UpdateWorker  />} />

        <Route path="/medicines" element={<Medicines />} />
        <Route path="/medicine/add" element={<MedProfile />} />
        <Route path="/medicine/update/:medicineId" element={<UpdateMed />} />

        <Route path="/error" element={<Error />} />

        <Route path="/checkout/patient" element={<PatientCheckout />} />
        <Route path="/checkout/stocks" element={<Stocks />} />
        <Route path="/checkout" element={<Checkout   />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
