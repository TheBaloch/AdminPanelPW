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

export default function DayCare() {
  const [daycareData, setDaycareData] = useState([]);
  const [petinfo, setPetinfo] = useState([]);

  const [daycare, setDaycare] = useState();

  const toEdit = (ID, edit, val) => {
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
              console.log("Daycare updated successfully");
              setDaycare(null);
            })
            .catch((error) => {
              console.error("Error updating daycare:", error);
            });
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });
    } else if (edit === "pickedupstatus" && val) {
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
          console.log("Daycare updated successfully");
          setDaycare(null);
        })
        .catch((error) => {
          console.error("Error updating daycare:", error);
        });
    } else {
      axios
        .get(`http://localhost:5000/api/daycare/${ID}`)
        .then((response) => {
          console.log(response.data);
          response.data[edit] = val;
          console.log(response.data);
          setDaycare(response.data);
        })
        .catch((error) => {
          console.error("Error retrieving data:", error);
        });
    }
  };

  // const toEdit = (ID, edit, val) => {
  //   axios
  //     .get(`http://localhost:5000/api/daycare/${ID}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       response.data[edit] = val;
  //       console.log(response.data);
  //       setDaycare(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving data:", error);
  //     });
  // };

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
        const [daycareRes, petInfoRes] = await Promise.all([
          daycareResponse,
          petInfoResponse,
        ]);

        setDaycareData(daycareRes.data);
        setPetinfo(petInfoRes.data);
      } catch (error) {
        console.error("Error fetching daycare data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = daycareData.filter((entry) => !entry.requestrejected);
  return (
    <div>
      {filteredData.length === 0 ? (
        <div className="no-requests">
          <p>No requests at this time.</p>
        </div>
      ) : (
        filteredData.map((entry) => {
          const pet = petinfo.find((pet) => pet._id === entry.petid);

          return (
            <div
              key={entry._id}
              style={{ width: "90%", marginTop: "6%", marginLeft: "5%" }}
            >
              <Typography>
                Daycare Request Details ID: {entry._id}{" "}
                <Chip
                  label=" Details"
                  variant="outlined"
                  style={{ backgroundColor: "grey" }}
                />
              </Typography>
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
                            />
                          </Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Typography>
                            <Chip
                              label="Approve"
                              variant="outlined"
                              onClick={() => {
                                toEdit(entry._id, "approvedcheck", true);
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
                              <Typography>
                                <Chip
                                  label="Approve"
                                  variant="outlined"
                                  onClick={() => {
                                    toEdit(entry._id, "pickedupstatus", true);
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
                  <Typography>Accordion 3</Typography>
                </AccordionSummary>
              </Accordion>

              <Accordion disabled={entry.delivered || !entry.dropoffstatus}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>Accordion 4</Typography>
                </AccordionSummary>
              </Accordion>
            </div>
          );
        })
      )}
    </div>
  );
}
