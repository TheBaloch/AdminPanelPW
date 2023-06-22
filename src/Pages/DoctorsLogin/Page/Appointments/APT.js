import React, { useState } from 'react';
import axios from 'axios';
import { Modal, ModalBody, Button } from 'react-bootstrap';
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Modalapprove from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';

export default function APT({ apt, UPDATE }) {
  const [expanded, setExpanded] = useState(false);
  const [petsdetail, showPetsdetail] = useState(false);
  const [approvemodal, setApproveModal] = useState(false);
  const [rejectmodal, setRejectModal] = useState(false);
  const [data, setData] = useState({ ...apt });

  const [pet, setPet] = useState({
    breed: '',
    gender: '',
    months: '',
    years: '',
    vaccinated: '',
    weight: '',
    pet: '',
    petName: '',
  });

  const handleUpdateVaccination = async (petId) => {
    console.log(petId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/updatevaccination/${petId}`,
        {
          method: 'PUT',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update vaccination status');
      }

      const updatedPet = await response.json();
      console.log('Updated pet:', updatedPet);
      // Handle the updated pet object as needed
    } catch (error) {
      console.error('Error updating vaccination status:', error);
      // Handle the error
    }
  };

  const fetchPet = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/petbyid/${apt.pet_id}`
      );
      if (response.data[0]) {
        setPet(response.data[0]);
        showPetsdetail(true);
      } else alert('Pets Not Found!!!');
    } catch (error) {
      console.error('Error retrieving pets:', error);
      throw new Error('Failed to retrieve pets');
    }
  };

  const handlePetDetails = () => {
    if (apt.pet_id) {
      fetchPet();
    } else alert('This is for another Pet');
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleForm = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const openApprove = () => {
    setData({ ...data, status: 'approved', reject_note: null });
    setApproveModal(true);
  };

  const openReject = () => {
    setData({
      ...data,
      status: 'rejected',
      additional_note: null,
      appointment_date: null,
    });
    setRejectModal(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/appointments`,
        data
      );
      setData(res.data);
      UPDATE();
      handleOnClose();
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Error');
    }
  };

  const handleOnClose = () => {
    showPetsdetail(false);
    setExpanded(false);
    setApproveModal(false);
    setRejectModal(false);
  };

  function convertToWeekday(dateString) {
    const date = new Date(dateString);
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const weekdayIndex = date.getDay();
    const weekday = weekdays[weekdayIndex];
    return weekday;
  }

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ width: '95%', marginLeft: '20px', marginTop: '50px' }}
      >
        <Table
          sx={{
            marginLeft: '30px',
            minWidth: 400,
            width: '1020px',
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Date for appointment</TableCell>
              <TableCell>Pet Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">{apt.user_name}</TableCell>

              <TableCell align="left">{apt.user_phone}</TableCell>
              <TableCell align="left">
                {apt.datereq}:
                <span style={{ fontWeight: 'bold', color: 'green' }}>
                  {convertToWeekday(apt.datereq)}
                </span>
              </TableCell>

              <TableCell align="left">
                <Chip
                  label="Petdetails"
                  variant="outlined"
                  // onClick={() => handleApprove(product._id)}
                  style={{ backgroundColor: 'grey' }}
                  onClick={handlePetDetails}
                />
              </TableCell>
              <TableCell align="left">
                <Chip
                  label="Approve"
                  variant="outlined"
                  onClick={openApprove}
                  style={{ backgroundColor: '#63F263' }}
                />
              </TableCell>
              <TableCell align="left">
                <Chip
                  label="Reject"
                  variant="outlined"
                  onClick={openReject}
                  style={{ backgroundColor: 'red' }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* ////////////////////////////////////////////// */}
        {apt.vaccination === 'true' ? (
          <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
            disabled={apt.status !== 'approved'}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                <span
                  style={{
                    fontWeight: 'bold',
                    marginLeft: '30px',
                    color: 'green',
                  }}
                >
                  Appointment For vaccination*
                </span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <TableRow>
                  <TableCell align="left">
                    <Chip
                      label="vaccinated"
                      variant="outlined"
                      onClick={() => handleUpdateVaccination(apt.pet_id)}
                      // onClick={handleUpdateVaccination(apt.pet_id)}
                      style={{ backgroundColor: '#63F263' }}
                    />
                  </TableCell>

                  <TableCell align="left">
                    <Chip
                      label="Decline"
                      variant="outlined"
                      onClick={openReject}
                      style={{ backgroundColor: 'red' }}
                    />
                  </TableCell>
                </TableRow>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ) : null}

        {/* //////////////////////////////////////////// */}
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              <span style={{ marginLeft: '30px', color: 'red' }}>
                User Note*
              </span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {/* <TableCell align="left">{apt.note}</TableCell> */}
              <span style={{ marginLeft: '30px', color: 'grey' }}>
                {apt.note}
              </span>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </TableContainer>

      {/* PetDetails Modal */}

      <>
        <Modal show={petsdetail} onClose={handleOnClose} centered>
          <Modal.Header onClick={() => showPetsdetail(false)} closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalBody>
              <Typography variant="body1">
                <strong>Type: </strong> {pet.pet}
              </Typography>
              <Typography variant="body1">
                <strong>Name: </strong>
                {pet.petName}
              </Typography>
              <Typography variant="body1">
                <strong>Breed: </strong>
                {pet.breed}
              </Typography>
              <Typography variant="body1">
                <strong>Gender: </strong>
                {pet.gender}
              </Typography>
              <Typography variant="body1">
                <strong>Age:</strong> {pet.years} <strong>Years,</strong>{' '}
                {pet.months} <strong>Months</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Weight:</strong> {pet.weight}
                <strong>Kgs</strong>
              </Typography>
              <Typography variant="body1">
                <strong>Vaccinated:</strong> {pet.vaccinated ? 'Yes' : 'No'}
              </Typography>
            </ModalBody>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => showPetsdetail(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/* Approve Modal  */}

      <>
        <Modalapprove
          keepMounted
          open={approvemodal}
          onClose={handleOnClose}
          slotProps={{
            backdrop: {
              sx: {
                opacity: 1,
                backdropFilter: 'blur(8px)',
                transition: 'opacity 400ms, backdrop-filter 400ms',
              },
            },
          }}
          sx={{
            visibility: approvemodal ? 'visible' : 'hidden',
          }}
        >
          <ModalDialog
            aria-labelledby="fade-modal-dialog-title"
            aria-describedby="fade-modal-dialog-description"
            sx={{
              opacity: 1,
              transition: 'opacity 300ms',
            }}
          >
            <Typography
              id="fade-modal-dialog-title"
              component="h2"
              sx={{ fontWeight: 'bold', marginBottom: '1rem' }}
            >
              Approve
            </Typography>

            <Typography
              id="fade-modal-dialog-description"
              variant="subtitle1"
              sx={{ marginBottom: '0.5rem' }}
            >
              User: <strong>{apt.user_name}</strong>
            </Typography>

            <Typography
              id="fade-modal-dialog-description"
              variant="subtitle1"
              sx={{ marginBottom: '0.5rem' }}
            >
              Additional Note: (Optional)
              <div>
                <textarea
                  name="additional_note"
                  className="input-field"
                  onChange={handleForm}
                  value={data.additional_note || ''}
                  rows={4}
                ></textarea>
              </div>
            </Typography>

            <Typography
              id="fade-modal-dialog-description"
              variant="subtitle1"
              sx={{ marginBottom: '0.5rem' }}
            >
              Date and Time:
              <div>
                <input
                  name="appointment_date"
                  onChange={handleForm}
                  type="datetime-local"
                  className="input-field"
                  value={data.appointment_date || ''}
                />
              </div>
            </Typography>

            <div>
              <button className="btn btn-primary m-1" onClick={handleUpdate}>
                Approve
              </button>
            </div>
          </ModalDialog>
        </Modalapprove>
      </>

      {/* Reject Modal */}

      <>
        <Modalapprove
          keepMounted
          open={rejectmodal}
          onClose={handleOnClose}
          slotProps={{
            backdrop: {
              sx: {
                opacity: 1,
                backdropFilter: 'blur(8px)',
                transition: 'opacity 400ms, backdrop-filter 400ms',
              },
            },
          }}
          sx={{
            visibility: rejectmodal ? 'visible' : 'hidden',
          }}
        >
          <ModalDialog
            aria-labelledby="fade-modal-dialog-title"
            aria-describedby="fade-modal-dialog-description"
            sx={{
              opacity: 1,
              transition: 'opacity 300ms',
            }}
          >
            <Typography
              id="fade-modal-dialog-title"
              component="h2"
              sx={{ fontWeight: 'bold', marginBottom: '1rem' }}
            >
              Reject
            </Typography>

            <Typography
              id="fade-modal-dialog-description"
              variant="subtitle1"
              sx={{ marginBottom: '0.5rem' }}
            >
              User: <strong>{apt.user_name}</strong>
            </Typography>

            <Typography
              id="fade-modal-dialog-description"
              variant="subtitle1"
              sx={{ marginBottom: '0.5rem' }}
            >
              Reason: (Optional)
              <div>
                <textarea
                  name="reject_note"
                  value={data.reject_note !== null ? data.reject_note : ''}
                  className="input-field"
                  onChange={handleForm}
                  rows={4}
                ></textarea>
              </div>
            </Typography>

            <div>
              <button className="btn btn-danger m-1" onClick={handleUpdate}>
                Reject
              </button>
            </div>
          </ModalDialog>
        </Modalapprove>
      </>
    </>
  );
}
