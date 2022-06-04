import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import IdCard from "./pages/idCard/IdCard";
import Patients from './pages/patients/Patients';
import Doctors from './pages/doctors/Doctors'
import Profile from './components/patients/profile/Profile';
import UpdateProfile from './components/patients/updateProfile/UpdateProfile';
import DoctorProfile from './components/doctors/doctorProfile/DoctorProfile';
import UpdateDoctor from './components/doctors/updateDoctor/UpdateWorker';
import EditProfile from './pages/editProfile/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workerId" element={<IdCard />} />

        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/create" element={<Profile />} />
        <Route path="/patient/update/:patientId" element={<UpdateProfile />} />

        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/create" element={<DoctorProfile />} />
        <Route path="/doctor/update/:doctorId" element={<UpdateDoctor />} />

        <Route path="/editprofile" element={<EditProfile />} />
      
        <Route path="/error" element={<Error />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
