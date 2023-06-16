import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import APT from './APT';

export default function Appointments() {
  const { _id } = JSON.parse(localStorage.getItem('doctor'));
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appointments/${_id}`
        );
        setAppointment(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAppointment();
  }, [_id]);
  if (!appointment) return <h1>Loading....</h1>;
  else if (appointment.length === 0) return <h1>No Appointments</h1>;
  return (
    <div>
      {appointment.map((apt) => (
        <APT apt={apt} key={apt._id} />
      ))}
    </div>
  );
}
