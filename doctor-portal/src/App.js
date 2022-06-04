import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateProfile from "./components/patients/updateProfile/UpdateProfile";
import Profile from "./components/patients/profile/Profile";
import Login from "./pages/login/Login";
import Patients from "./pages/patients/Patients";
import Register from "./pages/register/Register";
import Workers from "./pages/workers/Workers";
import UpdateWorker from "./components/worker/updateWorker/UpdateWorker";
import WorkerProfile from "./components/worker/workerProfile/WorkerProfile";
import IdCard from "./pages/idCard/IdCard";
import Error from './pages/error/Error'
import Home from "./pages/home/Home";
import EditProfile from "./pages/editProfile/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={ <Home /> } />

      <Route path="/doctorId" element={<IdCard />} />

        <Route path="/patients" element={<Patients />} />
        <Route path="/patient/create" element={<Profile />} />
        <Route path="/patient/update/:patientId" element={<UpdateProfile />} />

        <Route path="/workers" element={<Workers />} />
        <Route path="/worker/create" element={<WorkerProfile />} />
        <Route path="/worker/update/:workerId" element={<UpdateWorker />} />

        <Route path="/editprofile" element={<EditProfile />} />

        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
