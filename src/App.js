import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import BookingForm from "./components/bookingform";
import { auth } from "./components/firebase";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  const [userName, setUserName] = useState("");
  const [userid, setUserid] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        
        setUserName(user.displayName);
        setUserid(user.uid)
      } else setUserName("");
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home userId={userName} />} />
          <Route path="/booking" element={<BookingForm userId={userid}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
