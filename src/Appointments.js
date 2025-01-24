import React, { useEffect, useState } from 'react';

function Appointments({ username }) {
  const [appointments, setAppointments] = useState([]); // State to store fetched appointments
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Replace 'doctorName' with the logged-in doctor's name

    // Fetch appointments for the doctor
    fetch(`http://localhost:5000/api/doctors/${username}/schedule`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch appointments.');
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data); // Update state with fetched data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
        setError(error.message);
        setLoading(false); // Stop loading
      });
  }, []);

  // Function to handle the "Consulted" button click
  const handleConsulted = (appointment) => {
    const { patientName, problem, date, time } = appointment;
    const doctorName = username; // Example doctor name

    // Send a request to remove the appointment from the doctor's and patient's active lists
    fetch(`http://localhost:5000/doctors/${doctorName}/appointments/consulted`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientName,
        problem,
        date,
        time,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update appointments.');
        }
        // If the request is successful, remove the appointment from the local state
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) =>
              appointment.patientName !== patientName || appointment.date !== date || appointment.time !== time
          )
        );
      })
      .catch((error) => {
        console.error('Error updating appointment:', error);
        setError(error.message);
      });
  };

  if (loading) {
    return <p>Loading appointments...</p>; // Show loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message
  }

  return (
    <div>
      <h2>Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments scheduled.</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Problem</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.patientName}</td>
                <td>{appointment.problem}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>
                  <button onClick={() => handleConsulted(appointment)}>Consulted</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Appointments;
