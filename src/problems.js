import React, { useState } from "react";

function Problems({ username }) {
  const [problem, setProblem] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointment = {
      username,
      problem,
      doctorName,
      dateTime,
    };

    // Call backend to check doctor availability and save appointment
    const response = await fetch(`http://localhost:5000/${doctorName}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    const data = await response.json();
    if (data.success) {
      setMessage("Appointment successfully booked!");
    } else {
      setMessage("Doctor is not available at the selected time.");
    }
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Problem:</label>
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Doctor Name:</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date & Time:</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Problems;
