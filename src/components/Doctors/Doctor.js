import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Doctor.css';

function Doctor({ doctor, onDelete, onUpdateDoctor }) {
  const imgURL = `http://localhost:5000/${doctor.image}`;
  const [showModal, setShowModal] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({
    f_name: doctor.f_name,
    l_name: doctor.l_name,
    specialization: doctor.specialization,
    available_days: doctor.available_days,
    phone: doctor.phone,
    email: doctor.email,
    pass: doctor.pass,
    image: null,
  });

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedDoctor((prevDoctor) => ({
      ...prevDoctor,
      image: file,
    }));
  };

  const handleDoctorEdit = async () => {
    const formData = new FormData();
    formData.append('f_name', editedDoctor.f_name);
    formData.append('l_name', editedDoctor.l_name);
    formData.append('specialization', editedDoctor.specialization);
    formData.append('available_days', editedDoctor.available_days);
    formData.append('phone', editedDoctor.phone);
    formData.append('email', editedDoctor.email);
    formData.append('pass', editedDoctor.pass);
    formData.append('image', editedDoctor.image);

    try {
      const response = await fetch(
        `http://localhost:5000/api/doctors/${doctor._id}`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (response.ok) {
        console.log('Doctor updated successfully');
        handleClose();
        onUpdateDoctor();
      } else {
        console.error('Error updating doctor:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const handleDelete = () => {
    onDelete(doctor._id);
  };

  return (
    <div style={{ display: 'inline-flex' }} className="mdiv">
      <img
        src={imgURL}
        alt={`${doctor.f_name} ${doctor.l_name}`}
        style={{ height: '60px', width: '60px', marginLeft: '5px' }}
      />
      <p className="fname">{doctor.f_name}</p>
      <p className="para">{doctor.l_name}</p>
      <p className="phn">{doctor.phone}</p>
      <p className="eml">{doctor.email}</p>
      <button onClick={handleEdit} className="btn btn-primary btnc">
        Edit
      </button>
      <button onClick={handleDelete} className="btn btn-danger btnc">
        Delete
      </button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Doctor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="f_name"
                value={editedDoctor.f_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="l_name"
                value={editedDoctor.l_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formspecialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={editedDoctor.specialization}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formAvailableDays">
              <Form.Label>Available Days</Form.Label>
              <Form.Control
                type="text"
                name="available_days"
                value={editedDoctor.available_days}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editedDoctor.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedDoctor.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="pass"
                value={editedDoctor.pass}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Current Image</Form.Label>
              <br />
              <img
                src={imgURL}
                alt={`${doctor.f_name} ${doctor.l_name}`}
                style={{
                  height: '100px',
                  width: '100px',
                  marginBottom: '10px',
                }}
              />
              <Form.Label>Upload New Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDoctorEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Doctor;
