import Dashboard from "./pages/dashboard/Dashboard";
import Patients from "./pages/patients/Patients";
import "./app.scss";
import Profile from "./components/profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateProfile from "./components/updateProfile/UpdateProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/profile" element={<Profile />} />
        <Route path="/patient/update" element={<UpdateProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
