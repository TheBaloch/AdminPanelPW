import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import APT from './APT';

export default function Appointments() {
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
  else if (appointment.length === 0)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '85vh' }}
      >
        <h1>No Appointments Found</h1>
      </div>
    );
  return (
    <div>
      {appointment.map((apt) => (
        <APT apt={apt} UPDATE={UPDATE} key={apt._id} />
      ))}
    </div>
  );
}
