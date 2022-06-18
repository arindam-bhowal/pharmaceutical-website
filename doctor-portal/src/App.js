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
      <Route path="/" element={ localStorage.getItem('doc') ? <Home /> : <Login /> } />

      <Route path="/doctorId" element={localStorage.getItem('doc') ? <IdCard />  : <Login />  }  />

        <Route path="/patients" element={localStorage.getItem('doc') ? <Patients />  : <Login />  } />
        <Route path="/patient/create" element={localStorage.getItem('doc') ? <Profile />  : <Login />  } />
        <Route path="/patient/update/:patientId" element={localStorage.getItem('doc') ? <UpdateProfile /> : <Login />  } />

        <Route path="/workers" element={localStorage.getItem('doc') ? <Workers />  : <Login />  } />
        <Route path="/worker/create" element={localStorage.getItem('doc') ? <WorkerProfile /> : <Login />  } />
        <Route path="/worker/update/:workerId" element={localStorage.getItem('doc') ? <UpdateWorker /> : <Login />  } />

        <Route path="/editprofile" element={localStorage.getItem('doc') ? <EditProfile /> : <Login />  } />

        <Route path="/login" element={ localStorage.getItem('doc') ? <Home /> : <Login /> } />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
