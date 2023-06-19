import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import "./DayCare.css";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

export default function DayCare() {
  const [daycareData, setDaycareData] = useState([]);
  const [petinfo, setPetinfo] = useState([]);
  const [triger, setTriger] = useState(null);
  const [daycare, setDaycare] = useState();
  const [petdetail, setPetdetail] = useState(null);

  const [open, setOpen] = React.useState(false);

  const [filterOption, setFilterOption] = useState("all");

  const [users, setUsers] = useState([]);

  const filteredData = daycareData.filter((entry) => {
    if (filterOption === "all") {
      return !entry.delivered;
    } else if (filterOption === "pending") {
      return entry.approvedcheck === false;
    } else if (filterOption === "drop") {
      return entry.dropoffstatus === true && entry.delivered === false;
    } else if (filterOption === "rejected") {
      return entry.requestrejected === true;
    } else if (filterOption === "comp") {
      return entry.delivered === true;
    }
    return true;
  });

  const handlePetdetails = (pets) => {
    setPetdetail(pets);
    setOpen(true);
    console.log(petdetail);
  };
  const handleModalClose = () => {
    setPetdetail(null);
    setOpen(false);
  };

  function convertToWeekday(dateString) {
    const date = new Date(dateString);
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekdayIndex = date.getDay();
    const weekday = weekdays[weekdayIndex];
    return weekday;
    // console.log(weekday);
  }
  const toEditt = (ID, edit, val, date) => {
    const currentDate = new Date().toLocaleDateString("en-CA");
    // console.log(date);
    if (new Date(date) < new Date(currentDate)) {
      toast.error("The date has already passed.");
    } else {
      if (currentDate === date) {
        if (edit === "pickedupstatus" && val) {
          console.log();
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, "0");
          const day = String(today.getDate()).padStart(2, "0");
          const formattedDate = `${year}/${month}/${day}`;

          const updatedData = {
            [edit]: val,
            pickupdate: formattedDate,
          };

          axios
            .put(`http://localhost:5000/api/daycare/${ID}`, updatedData)
            .then(() => {
              toast.success("Sucessfully updated");
              setDaycare(null);
              setTriger("true");
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error updating daycare:", error);
            });
        }
      } else {
        toast.error("Pickup is sheduled on " + date);
      }
    }
  };
  const toEdit = (ID, edit, val, date) => {
    const currentDate = new Date().toLocaleDateString("en-CA");
    // console.log(date);
    if (new Date(date) < new Date(currentDate)) {
      toast.error("The date has already passed.");
    } else {
      if (edit === "approvedcheck" && val) {
        const generatedNumber = Math.floor(100000 + Math.random() * 900000);
        axios
          .get(`http://localhost:5000/api/daycare/${ID}`)
          .then((response) => {
            const updatedData = {
              ...response.data,
              [edit]: val,
              identity_number: generatedNumber.toString(),
            };
            axios
              .put(`http://localhost:5000/api/daycare/${ID}`, updatedData)
              .then(() => {
                toast.success("Sucessfully updated");
                setDaycare(null);
                setTriger("true");
                console.log(triger);
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error updating daycare:", error);
              });
          })
          .catch((error) => {
            console.error("Error retrieving data:", error);
          });
      } else {
        console.log(ID, edit, val);
        axios
          .get(`http://localhost:5000/api/daycare/${ID}`)
          .then((response) => {
            const updatedData = {
              ...response.data,
              [edit]: val,
            };
            axios
              .put(`http://localhost:5000/api/daycare/${ID}`, updatedData)
              .then(() => {
                toast.success("Sucessfully updated");
                console.log("here");
                setDaycare(null);
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error updating daycare:", error);
              });
          })
          .catch((error) => {
            console.error("Error retrieving data:", error);
          });
      }
    }
  };

  useEffect(() => {
    if (daycare) {
      axios
        .put(`http://localhost:5000/api/daycare/${daycare._id}`, daycare)
        .then(() => {
          console.log("Daycare updated successfully");
          setDaycare(null);
        })
        .catch((error) => {
          console.error("Error updating daycare:", error);
        });
    }
  }, [daycare]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const daycareResponse = axios.get("http://localhost:5000/api/daycare");
        const petInfoResponse = axios.get("http://localhost:5000/api/pets/");
        const userInfoResponse = axios.get("http://localhost:5000/api/users");
        const [daycareRes, petInfoRes, userInfoRes] = await Promise.all([
          daycareResponse,
          petInfoResponse,
          userInfoResponse,
        ]);

        setDaycareData(daycareRes.data);
        setPetinfo(petInfoRes.data);
        setUsers(userInfoRes.data);
      } catch (error) {
        console.error("Error fetching daycare data:", error);
      }
    };

    fetchData();
    if (triger) {
      setTriger(null);
    }
  }, [triger]);

  return (
    <div style={{ marginTop: "2%", marginLeft: "10px" }}>
      <ToastContainer />
      <div>
        <span>Filters</span>
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending Requests</option>

          <option value="drop">Dropoff Requests</option>

          <option value="rejected">Rejected Requests</option>
          <option value="comp">completed Requests</option>
        </select>
      </div>
      {filteredData.length === 0 ? (
        <div className="no-requests">
          <p>No requests at this time.</p>
        </div>
      ) : (
        filteredData.map((entry) => {
          const pet = petinfo.find((pet) => pet._id === entry.petid);
          const userData = users.find((pet) => pet._id === entry.userid);

          // users
          return (
            <div
              key={entry._id}
              style={{ width: "90%", marginTop: "6%", marginLeft: "5%" }}
            >
              <Typography>Daycare Request Details ID: {entry._id} </Typography>
              <Accordion disabled={entry.approvedcheck}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Step 1: Approval</Typography>
                </AccordionSummary>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Pet Type</TableCell>
                        <TableCell align="right">Pickup date</TableCell>
                        <TableCell align="right">Pickupadress</TableCell>
                        <TableCell align="right">Pickupcity</TableCell>
                        <TableCell align="right">Pet Details</TableCell>
                        <TableCell align="right">Approve</TableCell>
                        <TableCell align="right">Reject</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right">
                          <Typography>{pet.pet}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography>{entry.pickupdate}</Typography>
                          <p style={{ fontWeight: "bold", color: "green" }}>
                            {convertToWeekday(entry.pickupdate)}
                          </p>
                        </TableCell>

                        <TableCell align="right">
                          <Typography>{entry.pickupadress}</Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Typography>{entry.pickupcity}</Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Typography>
                            <Chip
                              label="View Pet Details"
                              variant="outlined"
                              style={{ backgroundColor: "grey" }}
                              onClick={() => handlePetdetails(pet)}
                            />
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Typography>
                            <Chip
                              label="Approve"
                              variant="outlined"
                              onClick={() => {
                                toEdit(
                                  entry._id,
                                  "approvedcheck",
                                  true,
                                  entry.pickupdate
                                );
                              }}
                              style={{ backgroundColor: "#63F263" }}
                            />
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography>
                            <Chip
                              label="Reject"
                              variant="outlined"
                              onClick={() => {
                                toEdit(entry._id, "requestrejected", true);
                              }}
                              style={{ backgroundColor: "#FC4E40" }}
                            />
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Accordion>
              <Accordion
                disabled={entry.pickedupstatus || !entry.approvedcheck}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Step 2: pickedup status</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="right">Identity Code</TableCell>
                            <TableCell align="right">Pickup Time</TableCell>
                            <TableCell align="right">Pickup date</TableCell>
                            <TableCell align="right">Days Requested </TableCell>
                            <TableCell align="right">PhoneNo </TableCell>
                            <TableCell align="right">pickedup status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">
                              {entry.identity_number}
                            </TableCell>

                            <TableCell align="right">
                              {entry.pickuptime === "1" && (
                                <div>09:00am-10:00am</div>
                              )}
                              {entry.pickuptime === "2" && (
                                <div>10:00am-11:00am</div>
                              )}
                              {entry.pickuptime === "3" && (
                                <div>11:00am-12:00pm</div>
                              )}
                              {entry.pickuptime === "4" && (
                                <div>12:00pm-01:00pm</div>
                              )}
                              {entry.pickuptime === "5" && (
                                <div>01:00pm-02:00pm</div>
                              )}
                              {entry.pickuptime === "6" && (
                                <div>02:00pm-03:00pm</div>
                              )}
                              {entry.pickuptime === "7" && (
                                <div>03:00pm-04:00pm</div>
                              )}
                              {entry.pickuptime === "8" && (
                                <div>04:00pm-05:00pm</div>
                              )}
                              {entry.pickuptime === "9" && (
                                <div>05:00pm-06:00pm</div>
                              )}
                            </TableCell>

                            <TableCell align="right">
                              <Typography>{entry.pickupdate}</Typography>
                              <p style={{ fontWeight: "bold", color: "green" }}>
                                {convertToWeekday(entry.pickupdate)}
                              </p>
                            </TableCell>

                            <TableCell align="right">
                              <Typography>
                                {entry.toaldays === "1" && <div>1 day</div>}
                                {entry.toaldays === "2" && <div>2 days</div>}
                                {entry.toaldays === "3" && <div>3 days</div>}
                                {entry.toaldays === "4" && <div>Notsure</div>}
                              </Typography>
                            </TableCell>

                            <TableCell align="right">
                              <Typography>{userData.phone}</Typography>
                            </TableCell>

                            <TableCell align="right">
                              <Typography>
                                <Chip
                                  label="PickedUp"
                                  variant="outlined"
                                  onClick={() => {
                                    toEditt(
                                      entry._id,
                                      "pickedupstatus",
                                      true,
                                      entry.pickupdate
                                    );
                                  }}
                                  style={{ backgroundColor: "#63F263" }}
                                />
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                disabled={entry.dropoffstatus || !entry.pickedupstatus}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>Step 3: Status</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Pickedup date</TableCell>
                            <TableCell align="right">Identity Code</TableCell>
                            <TableCell align="right">Days Requested </TableCell>
                            <TableCell align="right">Status </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="left">
                              <Typography>{entry.pickupdate}</Typography>
                              <p style={{ fontWeight: "bold", color: "green" }}>
                                {convertToWeekday(entry.pickupdate)}
                              </p>
                            </TableCell>
                            <TableCell align="right">
                              {entry.identity_number}
                            </TableCell>
                            <TableCell align="right">
                              <Typography>
                                {entry.toaldays === "1" && <div>1 day</div>}
                                {entry.toaldays === "2" && <div>2 days</div>}
                                {entry.toaldays === "3" && <div>3 days</div>}
                                {entry.toaldays === "4" && <div>Notsure</div>}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <p style={{ fontWeight: "bold", color: "green" }}>
                                Pet is being taken care
                              </p>
                              {/* <span>Pet is being taken care</span> */}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion disabled={entry.delivered || !entry.dropoffstatus}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>Step 4: dropoff and Payment </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Dropoff date</TableCell>
                            <TableCell align="left">Dropoff Adress</TableCell>
                            <TableCell align="left">Dropoff city</TableCell>
                            <TableCell align="left">Dropoff time</TableCell>
                            <TableCell align="right">Days serviced </TableCell>
                            <TableCell align="right">Payment amount </TableCell>
                            <TableCell align="right">PhoneNo </TableCell>
                            <TableCell align="right">Status </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell align="left">
                              <Typography>{entry.dropoffdate}</Typography>
                              <p style={{ fontWeight: "bold", color: "green" }}>
                                {convertToWeekday(entry.pickupdate)}
                              </p>
                            </TableCell>
                            <TableCell align="left">
                              <Typography>{entry.dropoffadress}</Typography>
                            </TableCell>

                            <TableCell align="left">
                              <Typography>{entry.dropoffcity}</Typography>
                            </TableCell>

                            <TableCell align="left">
                              <Typography>
                                {entry.dropofftime === "1" && (
                                  <div>09:00am-10:00am</div>
                                )}
                                {entry.dropofftime === "2" && (
                                  <div>10:00am-11:00am</div>
                                )}
                                {entry.dropofftime === "3" && (
                                  <div>11:00am-12:00pm</div>
                                )}
                                {entry.dropofftime === "4" && (
                                  <div>12:00pm-01:00pm</div>
                                )}
                                {entry.dropofftime === "5" && (
                                  <div>01:00pm-02:00pm</div>
                                )}
                                {entry.dropofftime === "6" && (
                                  <div>02:00pm-03:00pm</div>
                                )}
                                {entry.dropofftime === "7" && (
                                  <div>03:00pm-04:00pm</div>
                                )}
                                {entry.dropofftime === "8" && (
                                  <div>04:00pm-05:00pm</div>
                                )}
                                {entry.dropofftime === "9" && (
                                  <div>05:00pm-06:00pm</div>
                                )}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{entry.daysservise}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{entry.bill}.Rs</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{userData.phone}</Typography>
                            </TableCell>

                            <TableCell align="right">
                              <Typography>
                                <Chip
                                  label="Pet Dropedoff"
                                  variant="outlined"
                                  onClick={() => {
                                    toEdit(entry._id, "delivered", true);
                                  }}
                                  style={{ backgroundColor: "#63F263" }}
                                />
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })
      )}
      <React.Fragment>
        <Modal open={open} onClose={handleModalClose}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            aria-labelledby="alert-dialog-modal-title"
            aria-describedby="alert-dialog-modal-description"
          >
            <Typography
              style={{ fontSize: "30px" }}
              id="alert-dialog-modal-title"
              component="h1"
              startDecorator={<WarningRoundedIcon />}
            >
              Details
            </Typography>
            <Divider />
            {petdetail && (
              <Typography
                id="alert-dialog-modal-description"
                textColor="text.tertiary"
              >
                <div style={{ fontSize: "20px", display: "flex" }}>
                  pet type:
                  <div style={{ color: "grey" }}>{petdetail.pet}</div>
                </div>
              </Typography>
            )}

            {petdetail && (
              <Typography
                id="alert-dialog-modal-description"
                textColor="text.tertiary"
              >
                <div style={{ fontSize: "20px", display: "flex" }}>
                  breed:
                  <div style={{ color: "grey" }}>{petdetail.breed}</div>
                </div>
              </Typography>
            )}

            {petdetail && (
              <Typography
                id="alert-dialog-modal-description"
                textColor="text.tertiary"
              >
                <div style={{ fontSize: "20px", display: "flex" }}>
                  Gender:
                  <div style={{ color: "grey" }}>{petdetail.gender}</div>
                </div>
              </Typography>
            )}

            {petdetail && (
              <Typography
                id="alert-dialog-modal-description"
                textColor="text.tertiary"
              >
                <div style={{ fontSize: "20px", display: "flex" }}>
                  weight:
                  <div style={{ color: "grey" }}>{petdetail.weight}</div>
                </div>
              </Typography>
            )}
            {petdetail && (
              <Typography
                id="alert-dialog-modal-description"
                textColor="text.tertiary"
              >
                <div style={{ fontSize: "20px", display: "flex" }}>
                  Age:
                  <div style={{ display: "flex", color: "grey" }}>
                    {petdetail.years}year {petdetail.months}month
                  </div>
                </div>
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "flex-end",
                pt: 2,
              }}
            ></Box>
          </ModalDialog>
        </Modal>
      </React.Fragment>
    </div>
  );
}
