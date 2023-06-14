// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Doctor from './Doctor';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// function Doctors() {
//   const [doctors, setDoctors] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newDoctor, setNewDoctor] = useState({
//     f_name: '',
//     l_name: '',
//     specialization: '',
//     available_days: '',
//     phone: '',
//     email: '',
//     pass: '',
//     image: null,
//   });

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/doctors');
//       setDoctors(response.data);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const handleAdd = () => {
//     setShowModal(true);
//   };

//   const handleClose = () => {
//     setShowModal(false);
//     setNewDoctor({
//       f_name: '',
//       l_name: '',
//       specialization: '',
//       available_days: '',
//       phone: '',
//       email: '',
//       pass: '',
//       image: null,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewDoctor((prevDoctor) => ({
//       ...prevDoctor,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setNewDoctor((prevDoctor) => ({
//       ...prevDoctor,
//       image: file,
//     }));
//   };

//   const handleDoctorSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('f_name', newDoctor.f_name);
//       formData.append('l_name', newDoctor.l_name);
//       formData.append('phone', newDoctor.phone);
//       formData.append('specialization', newDoctor.specialization);
//       formData.append('available_days', newDoctor.available_days);
//       formData.append('email', newDoctor.email);
//       formData.append('pass', newDoctor.pass);
//       formData.append('image', newDoctor.image);

//       await axios.post('http://localhost:5000/api/doctors', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       handleClose();
//       fetchDoctors(); // Fetch the updated list of doctors after successful addition
//     } catch (error) {
//       console.error('Error adding doctor:', error);
//     }
//   };

//   const handleDoctorDelete = async (doctorId) => {
//     const confirmDelete = window.confirm(
//       'Are you sure you want to delete this doctor?'
//     );
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:5000/api/doctors/${doctorId}`);
//         fetchDoctors(); // Fetch the updated list of doctors after successful deletion
//       } catch (error) {
//         console.error('Error deleting doctor:', error);
//       }
//     }
//   };

//   const updateDoctorList = () => {
//     fetchDoctors();
//   };

//   return (
//     <div style={{ width: '30rem' }}>
//       <h3 className="m-3 mx-4">
//         All Doctors{' '}
//         <button onClick={handleAdd} className="btn btn-primary mx-5">
//           Add New
//         </button>
//       </h3>
//       {doctors.map((doctor) => (
//         <Doctor
//           key={doctor._id}
//           doctor={doctor}
//           onDelete={handleDoctorDelete}
//           onUpdateDoctor={updateDoctorList}
//         />
//       ))}

//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Doctor</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleDoctorSubmit}>
//             <Form.Group controlId="formFirstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="f_name"
//                 value={newDoctor.f_name}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formLastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="l_name"
//                 value={newDoctor.l_name}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formSpecialization">
//               <Form.Label>Specialization</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="specialization"
//                 value={newDoctor.specialization}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formAvailableDays">
//               <Form.Label>Available Days</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="available_days"
//                 value={newDoctor.available_days}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formPhone">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="phone"
//                 value={newDoctor.phone}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={newDoctor.email}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="pass"
//                 value={newDoctor.pass}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formImage">
//               <Form.Label>Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="image"
//                 onChange={handleImageChange}
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default Doctors;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Doctor from "./Doctor";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const times = [
  "8am-9am",
  "9am-10am",
  "10am-11am",
  "11am-12pm",
  "12pm-1pm",
  "1pm-2pm",
  "2pm-3pm",
  "3pm-4pm",
  "4pm-5pm",
  "5pm-6pm",
  "6pm-7pm",
  "7pm-8pm",
  "8pm-9pm",
];

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

  // ???????????????????????????????????????????????????????????????????????????????????
  const [selectedDays, setSelectedDays] = React.useState([]);
  const [selectedTimes, setSelectedTimes] = React.useState([]);

  const handleDayChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDays(value);
  };

  const handleTimeChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedTimes(value);
  };

  // React.useEffect(() => {
  //   console.log("Selected Days:", selectedDays);
  //   console.log("Selected Times:", selectedTimes);
  // }, [selectedDays, selectedTimes]);

  // ???????????????????????????????????????????????????????????????????????????????????

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
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

      await axios.post("http://localhost:5000/api/doctors", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleClose();
      fetchDoctors(); // Fetch the updated list of doctors after successful addition
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  const handleDoctorDelete = async (doctorId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/doctors/${doctorId}`);
        fetchDoctors(); // Fetch the updated list of doctors after successful deletion
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    }
  };

  const updateDoctorList = () => {
    fetchDoctors();
  };

  return (
    <div style={{ width: "30rem" }}>
      <h3 className="m-3 mx-4">
        All Doctors{" "}
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
            <Form.Group controlId="formfield">
              <Form.Label>Field</Form.Label>
              <Form.Control
                type="text"
                name="field"
                value={newDoctor.field}
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

///////////////////////////////////////////////////////////////////////////
