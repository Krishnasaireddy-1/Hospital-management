import React, { useState, useEffect } from 'react';

function Patientschedule({ username }) {
  const [appointments, setAppointments] = useState([]); // State to store fetched appointments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch the patient's appointments when the component mounts
  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${username}/active`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Patient's Scheduled Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found for you.</p>
      ) : (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <strong>Doctor:</strong> {appointment.doctor} <br />
              <strong>Problem:</strong> {appointment.problem} <br />
              <strong>Date:</strong> {appointment.date} <br />
              <strong>Time:</strong> {appointment.time} <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Patientschedule;
