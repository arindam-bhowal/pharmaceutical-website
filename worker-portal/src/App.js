import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/error/Error";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import IdCard from "./pages/idCard/IdCard";
import Patients from "./pages/patients/Patients";
import Doctors from "./pages/doctors/Doctors";
import Profile from "./components/patients/profile/Profile";
import UpdateProfile from "./components/patients/updateProfile/UpdateProfile";
import DoctorProfile from "./components/doctors/doctorProfile/DoctorProfile";
import UpdateDoctor from "./components/doctors/updateDoctor/UpdateWorker";
import EditProfile from "./pages/editProfile/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={localStorage.getItem("worker") ? <Home /> : <Login />}
        />
        <Route
          path="/workerId"
          element={localStorage.getItem("worker") ? <IdCard /> : <Login />}
        />

        <Route
          path="/patients"
          element={localStorage.getItem("worker") ? <Patients /> : <Login />}
        />
        <Route
          path="/patient/create"
          element={localStorage.getItem("worker") ? <Profile /> : <Login />}
        />
        <Route
          path="/patient/update/:patientId"
          element={
            localStorage.getItem("worker") ? <UpdateProfile /> : <Login />
          }
        />

        <Route
          path="/doctors"
          element={localStorage.getItem("worker") ? <Doctors /> : <Login />}
        />
        <Route
          path="/doctor/create"
          element={
            localStorage.getItem("worker") ? <DoctorProfile /> : <Login />
          }
        />
        <Route
          path="/doctor/update/:doctorId"
          element={
            localStorage.getItem("worker") ? <UpdateDoctor /> : <Login />
          }
        />

        <Route
          path="/editprofile"
          element={localStorage.getItem("worker") ? <EditProfile /> : <Login />}
        />

        <Route path="/error" element={<Error />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={localStorage.getItem("worker") ? <Home /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
