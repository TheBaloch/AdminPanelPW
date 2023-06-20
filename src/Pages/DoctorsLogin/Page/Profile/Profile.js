import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Avatar } from '@mui/material';

export default function Profile({ handleUpdate }) {
  const [doctor, setDoctor] = useState();
  const [image, setImage] = useState(null);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctor((prevDoctor) => ({ ...prevDoctor, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      image: file,
    }));
    setImage(file);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const { _id } = JSON.parse(localStorage.getItem('doctor'));
      try {
        const response = await axios.get(
          `http://localhost:5000/api/doctors/${_id}`
        );
        setDoctor(response.data);

        if (response.data.available_days === 'undefined') {
          setDoctor((prevDoctor) => ({
            ...prevDoctor,
            available_days: '',
          }));
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  if (!doctor) return <h1>Loading....</h1>;

  return (
    <>
      <Form className="p-2 m-3">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <label htmlFor="profile-image-upload" className="btn">
            <Avatar
              alt={`${doctor.f_name} ${doctor.l_name}`}
              src={
                image
                  ? URL.createObjectURL(image)
                  : `http://localhost:5000/${doctor.image}`
              }
              style={{
                width: '150px',
                height: '150px',
                cursor: 'pointer',
              }}
            />
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
          className="mb-3"
        >
          <div style={{ width: '48%' }}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="f_name"
              value={doctor.f_name}
              onChange={handleInputChange}
            />
          </div>

          <div style={{ width: '48%' }}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="l_name"
              value={doctor.l_name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
          className="mb-3"
        >
          <div style={{ width: '48%' }}>
            <Form.Group controlId="formspecialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                as="select"
                name="specialization"
                value={doctor.specialization}
                onChange={handleInputChange}
              >
                <option value="">Select Specialization</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Surgeon">Surgeon</option>
                <option value="Dentist">Dentist</option>
                <option value="Nutritionist">Nutritionist</option>
                <option value="Oncologist">Oncologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Others">Others</option>
              </Form.Control>
            </Form.Group>
          </div>

          <div style={{ width: '48%' }}>
            <Form.Group controlId="formAvailableDays">
              <Form.Label>Available Days</Form.Label>
              <Form.Control
                as="select"
                name="available_days"
                value={doctor.available_days}
                onChange={handleInputChange}
              >
                <option value="">{doctor.available_days}</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div
          style={{ display: 'flex', justifyContent: 'space-between' }}
          className="mb-1"
        >
          <div style={{ width: '48%' }}>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={doctor.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>

          <div style={{ width: '48%' }}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={doctor.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Password */}
          <div style={{ width: '48%' }}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="pass"
                value={doctor.pass}
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          {/* Save Changes button */}
          <div style={{ width: '48%', marginLeft: 'auto', marginTop: 'auto' }}>
            <Button variant="primary" onClick={handleDoctorEdit}>
              Save Changes
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}
