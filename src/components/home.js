import React, { useState, useEffect } from "react";
import { auth, database,  } from "./firebase";
import { Link } from 'react-router-dom';
import UserDetails from "./userdetails";

function Home() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.uid;
      const appointmentsRef = database.collection("bookings").where("userId", "==", userId);
      const snapshot = await appointmentsRef.get();
      const appointmentData = snapshot.docs.map(doc => doc.data());
      setAppointments(appointmentData);
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <div><UserDetails/></div>
          <h2>Appointments</h2>
          <ul>
            {appointments.map(appointment => (
              <li key={appointment.id}>
                <p>Reason: {appointment.reason}</p>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
              </li>
            ))}
          </ul>
          <Link to="/booking">
            <button>Book an appointment</button>
          </Link>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h1>Please sign in</h1>
          <button >
          <Link to="/login">Login</Link>
          </button>
          <button >
          <Link to="/signup">SignUp</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
