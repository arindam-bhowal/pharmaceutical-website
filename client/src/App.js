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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            localStorage.getItem('user') ? <Home /> : <Login />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/history" element={<History />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/error" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
