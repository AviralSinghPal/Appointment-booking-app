import React, { useState } from "react";
import { Link } from "react-router-dom";
import { database } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const BookingForm = (props) => {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const collectionRef = collection(database, "bookings");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Reason: ", reason);
    console.log("Date: ", date);
    console.log("Time: ", time);
    console.log("UserId: ", props.userId);

    try {
      addDoc(collectionRef, {
        reason: reason,
        date: date,
        time: time,
        uid: props.userId,
      })
        .then(() => {
          alert("Data added");
        })
        .catch((err) => {
          alert(err.message);
        });

      console.log("Data successfully added to Firestore");
    } catch (error) {
      alert(error.message);
      console.error("Error adding data to Firestore: ", error.message);
    }

    setReason("");
    setDate("");
    setTime("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      
      <form onSubmit={handleSubmit}>
      <h2>Book an Appointment</h2>
        <div>
          <label htmlFor="reason">Reason for appointment:</label>
          <input
            type="text"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <br />
        <Link to="/">
          <button>Go to Home</button>
        </Link>
      </form>
    </div>
  );
};

export default BookingForm;
