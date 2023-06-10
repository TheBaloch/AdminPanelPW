import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Profile() {
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctors');
        setDoctor(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  if (!doctor) return <h1>Loading....</h1>;
  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{`${doctor.f_name} ${doctor.l_name}`}</h2>
      <p>Specialization: {doctor.specialization}</p>
      <p>Available Days: {doctor.available_days}</p>
      <p>Email: {doctor.email}</p>
      <p>Phone: {doctor.phone}</p>
      <p>Password: {doctor.pass}</p>
      <img
        src={`http://localhost:5000/${doctor.image}`}
        alt={`${doctor.f_name} ${doctor.l_name}`}
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  );
}
