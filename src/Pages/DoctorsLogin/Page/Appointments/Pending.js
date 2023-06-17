import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import APT from './APT';

export default function Pending() {
  const { _id } = JSON.parse(localStorage.getItem('doctor'));
  const [appointment, setAppointment] = useState(null);
  const [update, setUpdate] = useState(null);

  const UPDATE = () => {
    setUpdate('update');
  };

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
    setUpdate(null);
  }, [_id, update]);

  if (!appointment) return <h1>Loading....</h1>;
  else if (appointment.length === 0) return <h1>No Appointments</h1>;
  return (
    <div>
      {appointment
        .filter((apt) => apt.status === 'pending')
        .map((apt) => (
          <APT apt={apt} UPDATE={UPDATE} key={apt._id} />
        ))}
    </div>
  );
}
