import React from 'react';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Modal, Button, ModalBody } from 'react-bootstrap';
import axios from 'axios';

import { Transition } from 'react-transition-group';
// import Button from '@mui/joy/Button';
import Modalapprove from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';

export default function APT({ apt }) {
  const [expanded, setExpanded] = useState(false);
  const [petsdetail, showPetsdetail] = useState(false);
  const [approvemodal, setApproveModal] = useState(false);
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

  const fetchPet = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/petbyid/${apt.pet_id}`
      );
      setPet(response.data[0]);
      showPetsdetail(true);
    } catch (error) {
      console.error('Error retrieving pets:', error);
      throw new Error('Failed to retrieve pets');
    }
  };

  const handlePetDetails = () => {
    if (apt.pet_id) fetchPet();
    else alert('This is for another Pet');
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

  const handleOnApprove = () => {
    setData({ ...data, status: 'approved' });
    console.log(data);
  };

  const handleOnClose = () => {
    setData({ ...apt });
    setApproveModal(false);
    showPetsdetail(false);
    setExpanded(false);
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
    // console.log(weekday);
  }

  return (
    <div>
      <div>
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
      </div>
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
                <p style={{ fontWeight: 'bold', color: 'green' }}>
                  {convertToWeekday(apt.datereq)}
                </p>
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
                  onClick={() => setApproveModal(true)}
                  // onClick={() => handleApprove(product._id)}
                  style={{ backgroundColor: '#63F263' }}
                />
              </TableCell>
              <TableCell align="left">
                <Chip
                  label="Reject"
                  variant="outlined"
                  // onClick={() => handleApprove(product._id)}
                  style={{ backgroundColor: 'red' }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
              <p style={{ marginLeft: '30px', color: 'red' }}>User Note*</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {/* <TableCell align="left">{apt.note}</TableCell> */}
              <p style={{ marginLeft: '30px', color: 'grey' }}>{apt.text}</p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </TableContainer>

      {/* ??????????????????????????????????????? new model  */}

      <React.Fragment>
        <Transition in={approvemodal} timeout={400}>
          {(state) => (
            <Modalapprove
              keepMounted
              open={!['exited', 'exiting'].includes(state)}
              onClose={handleOnClose}
              slotProps={{
                backdrop: {
                  sx: {
                    opacity: 0,
                    backdropFilter: 'none',
                    transition: `opacity 400ms, backdrop-filter 400ms`,
                    ...{
                      entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                      entered: { opacity: 1, backdropFilter: 'blur(8px)' },
                    }[state],
                  },
                },
              }}
              sx={{
                visibility: state === 'exited' ? 'hidden' : 'visible',
              }}
            >
              <ModalDialog
                aria-labelledby="fade-modal-dialog-title"
                aria-describedby="fade-modal-dialog-description"
                sx={{
                  opacity: 0,
                  transition: `opacity 300ms`,
                  ...{
                    entering: { opacity: 1 },
                    entered: { opacity: 1 },
                  }[state],
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
                  textColor="text.secondary"
                  sx={{ marginBottom: '0.5rem' }}
                >
                  User: <strong>{apt.user_name}</strong>
                </Typography>

                <Typography
                  id="fade-modal-dialog-description"
                  variant="subtitle1"
                  textColor="text.secondary"
                  sx={{ marginBottom: '0.5rem' }}
                >
                  Additional Note:
                  <div>
                    <textarea
                      name="additional_note"
                      placeholder="Type Here"
                      className="input-field"
                      onChange={handleForm}
                      rows={4}
                    ></textarea>
                  </div>
                </Typography>

                <Typography
                  id="fade-modal-dialog-description"
                  variant="subtitle1"
                  textColor="text.secondary"
                  sx={{ marginBottom: '0.5rem' }}
                >
                  Date and Time:
                  <div>
                    <input
                      name="appointment_date"
                      onChange={handleForm}
                      type="datetime-local"
                      className="input-field"
                    />
                  </div>
                </Typography>
                <div>
                  <button
                    className="btn btn-primary m-1"
                    onClick={handleOnApprove}
                  >
                    Approve
                  </button>
                </div>
              </ModalDialog>
            </Modalapprove>
          )}
        </Transition>
      </React.Fragment>
    </div>
  );
}
