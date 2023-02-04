import React, { useState, useEffect } from "react";
// import { auth, database } from "./firebase";
import { Link } from 'react-router-dom';
import UserDetails from "./userdetails";
import { auth, database } from "./firebase";
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
        <div class="home-page">
        <h1 class="welcome-header">Welcome {user.displayName}</h1>
        <div class="user-details">
          <UserDetails />
        </div>
        <h2 class="appointments-header">Appointments</h2>
        {appointments.length > 0 ? (
          <div class="appointments-container">
            {appointments.map(appointment => (
              <div class="appointment-card" key={appointment.uid}>
                <p class="reason">Reason: {appointment.reason}</p>
                <p class="date-time">Date: {appointment.date}</p>
                <p class="date-time">Time: {appointment.time}</p>
              </div>
            ))}
          </div>
        ) : (
          <p class="no-appointments">You need to book an appointment</p>
        )}
        <Link to="/booking">
          <button class="book-appointment-btn">Book an appointment</button>
        </Link>
        <button class="sign-out-btn" onClick={() => auth.signOut()}>Sign Out</button>
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
