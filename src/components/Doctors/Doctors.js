import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Doctor from './Doctor';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    f_name: '',
    l_name: '',
    specialization: '',
    available_days: '',
    phone: '',
    email: '',
    pass: '',
    image: null,
  });

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setNewDoctor({
      f_name: '',
      l_name: '',
      specialization: '',
      available_days: '',
      phone: '',
      email: '',
      pass: '',
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewDoctor((prevDoctor) => ({
      ...prevDoctor,
      image: file,
    }));
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('f_name', newDoctor.f_name);
      formData.append('l_name', newDoctor.l_name);
      formData.append('phone', newDoctor.phone);
      formData.append('specialization', newDoctor.specialization);
      formData.append('available_days', newDoctor.available_days);
      formData.append('email', newDoctor.email);
      formData.append('pass', newDoctor.pass);
      formData.append('image', newDoctor.image);

      await axios.post('http://localhost:5000/api/doctors', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      handleClose();
      fetchDoctors(); // Fetch the updated list of doctors after successful addition
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleDoctorDelete = async (doctorId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this doctor?'
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/doctors/${doctorId}`);
        fetchDoctors(); // Fetch the updated list of doctors after successful deletion
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  const updateDoctorList = () => {
    fetchDoctors();
  };

  return (
    <div style={{ width: '30rem' }}>
      <h3 className="m-3 mx-4">
        All Doctors{' '}
        <button onClick={handleAdd} className="btn btn-primary mx-5">
          Add New
        </button>
      </h3>
      {doctors.map((doctor) => (
        <Doctor
          key={doctor._id}
          doctor={doctor}
          onDelete={handleDoctorDelete}
          onUpdateDoctor={updateDoctorList}
        />
      ))}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDoctorSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="f_name"
                value={newDoctor.f_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="l_name"
                value={newDoctor.l_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSpecialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={newDoctor.specialization}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formAvailableDays">
              <Form.Label>Available Days</Form.Label>
              <Form.Control
                type="text"
                name="available_days"
                value={newDoctor.available_days}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={newDoctor.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newDoctor.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="pass"
                value={newDoctor.pass}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Doctors;
