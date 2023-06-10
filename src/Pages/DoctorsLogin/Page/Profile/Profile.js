import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Profile({ handleUpdate }) {
  const [doctor, setDoctor] = useState();

  const handleDoctorEdit = async () => {
    const formData = new FormData();
    formData.append('f_name', doctor.f_name);
    formData.append('l_name', doctor.l_name);
    formData.append('specialization', doctor.specialization);
    formData.append('available_days', doctor.available_days);
    formData.append('phone', doctor.phone);
    formData.append('email', doctor.email);
    formData.append('pass', doctor.pass);
    formData.append('image', doctor.image);

    try {
      const response = await fetch(
        `http://localhost:5000/api/doctors/${doctor._id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (response.ok) {
        console.log('Profile updated successfully');
        localStorage.setItem('doctor', JSON.stringify(doctor));
        handleUpdate();
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      image: file,
    }));
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const { _id } = JSON.parse(localStorage.getItem('doctor'));
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctors/${_id}`
        );
        setDoctor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  if (!doctor) return <h1>Loading....</h1>;
  return (
    <>
      <Form>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="f_name"
            value={doctor.f_name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="l_name"
            value={doctor.l_name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formspecialization">
          <Form.Label>Specialization</Form.Label>
          <Form.Control
            type="text"
            name="specialization"
            value={doctor.specialization}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formAvailableDays">
          <Form.Label>Available Days</Form.Label>
          <Form.Control
            type="text"
            name="available_days"
            value={doctor.available_days}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={doctor.phone}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={doctor.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="pass"
            value={doctor.pass}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Current Image</Form.Label>
          <br />
          <img
            src={`http://localhost:5000/${doctor.image}`}
            alt={`${doctor.f_name} ${doctor.l_name}`}
            style={{
              height: '100px',
              width: '100px',
              marginBottom: '10px',
            }}
          />
          <Form.Label>Upload New Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImageChange} />
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={handleDoctorEdit}>
        Save Changes
      </Button>
    </>
  );
}
