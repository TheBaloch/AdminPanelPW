import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function Verify(verify) {
  const v = verify.verify;

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleUpdateVaccination = async (petId) => {
    console.log(petId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/updatevaccinationverified/${petId}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update vaccination status");
      }

      toast.success("successfully updated");
      deleteDocument(v._id);
    } catch (error) {
      console.error("Error updating vaccination status:", error);
      // Handle the error
    }
  };

  const deleteDocument = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/others/verification/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Perform any additional actions after successful deletion
      } else {
        const error = await response.json();
        console.error("Failed to delete document:", error);
        // Handle error response
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      // Handle network or other errors
    }
  };

  console.log(v);
  return (
    <>
      <ToastContainer />
      {/* <h1>Verification</h1>
      <img
        src={`${process.env.REACT_APP_API_URL}/${v.image}`}
        alt="failed"
        style={{ width: '200px', height: '200px' }}
      /> */}
      <TableContainer
        component={Paper}
        style={{ width: "95%", marginLeft: "20px", marginTop: "50px" }}
      >
        <Table
          sx={{
            marginLeft: "30px",
            minWidth: 400,
            width: "1020px",
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {/* <img
                  style={{ height: "80px", width: "80px" }}
                  src={`http://localhost:5000/${v.image}`}
                  alt="failed"
                  style={{ width: "200px", height: "200px" }}
                /> */}
                <img
                  style={{ height: "100px", width: "100px" }}
                  src={`http://localhost:5000/${v.image}`}
                  alt="Thumbnail"
                  // style={{ width: "200px", height: "200px" }}
                  onClick={handleOpen}
                />

                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Full Size Image</DialogTitle>
                  <DialogContent>
                    <img
                      src={`http://localhost:5000/${v.image}`}
                      alt="Full Size"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
              <TableCell component="th" scope="row">
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Name
                  </div>
                  <div>{v.pet_name}</div>
                </div>
              </TableCell>

              <TableCell component="th" scope="row">
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Type
                  </div>
                  <div>{v.pet_type}</div>
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  label="Pet Details"
                  variant="outlined"
                  style={{ backgroundColor: "grey" }}
                />
              </TableCell>

              <TableCell>
                <Chip
                  label="Approve"
                  variant="outlined"
                  onClick={() => handleUpdateVaccination(v.pet_id)}
                  style={{ backgroundColor: "#63F263" }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label="Reject"
                  variant="outlined"
                  onClick={() => deleteDocument(v._id)}
                  style={{ backgroundColor: "#FC4E40" }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          // disabled={apt.status !== "approved"}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              <span
                style={{
                  fontWeight: "bold",
                  marginLeft: "30px",
                  color: "red",
                }}
              >
                User Note*
              </span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <TableRow>
                <TableCell align="left">{v.note}</TableCell>
              </TableRow>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </TableContainer>
    </>
  );
}
