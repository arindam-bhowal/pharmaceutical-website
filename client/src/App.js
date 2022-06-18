import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/about/About";
import Appointment from "./pages/appointment/Appointment";
import Contact from "./pages/contact/Contact";
import History from "./pages/history/History";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Payment from "./pages/payment/Payment";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Error from "./pages/error/Error";
import Reciept from "./components/reciept/Reciept";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={localStorage.getItem("user") ? <Home /> : <Login />}
          />
          <Route path="/about" element={ localStorage.getItem("user") ? <About /> : <Login /> } />
          <Route path="/appointment" element={ localStorage.getItem("user") ? <Appointment /> : <Login /> } />
          <Route path="/history" element={ localStorage.getItem("user") ? <History /> : <Login /> } />
          <Route path="/payments" element={ localStorage.getItem("user") ? <Payment />: <Login />} />
          <Route path="/reciept" element={ localStorage.getItem("user") ? <Reciept />: <Login />} />
          <Route path="/profile" element={ localStorage.getItem("user") ? <Profile /> : <Login /> } />
          <Route path="/contact" element={ localStorage.getItem("user") ? <Contact /> : <Login /> } />

          <Route path="/error" element={<Error />} />
          <Route
            path="/login"
            element={localStorage.getItem("user") ? <Home /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
