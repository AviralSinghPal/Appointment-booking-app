import React, { useState, useEffect } from "react";
// import { auth, database } from "./firebase";
import { Link } from 'react-router-dom';
import UserDetails from "./userdetails";
import { auth, database, app } from "./firebase";
import {collection , getDocs } from 'firebase/firestore';
import './home.css'

function Home(props) {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const userId = auth.currentUser.uid;
    //   const appointmentsRef = database.collection("bookings").where("userId", "==", userId);
    //   const snapshot = await appointmentsRef.get();
    //   const appointmentData = snapshot.docs.map(doc => doc.data());

    //   setAppointments(appointmentData);
    //   console.log(snapshot);
    // };
    const collectionRef = collection(database,'bookings');
    const getData = () =>{
        getDocs(collectionRef).then((res)=>{
          const appointmentData = (res.docs.map((item)=>{            
            return item.data();
          }));
          setAppointments(appointmentData);
        });
      }
     
    if (user) {
      getData();
    }
  }, [user]);
  
    
  // database.collection('bookings').get().then((snapshots) =>{
  //   console.log(snapshots);
  // })

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
          <div className="appointments-container">
            {appointments.map(appointment => (
              <div key={appointment.uid} className="appointment-card">
                <p className="reason">Reason: {appointment.reason}</p>
                <p className="date-time">Date: {appointment.date}</p>
                <p className="date-time">Time: {appointment.time}</p>
              </div>
            ))}
          </div>
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
