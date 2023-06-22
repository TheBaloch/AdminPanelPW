import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(v);
  return (
    <>
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
                {v.pet_name}
              </TableCell>

              <TableCell component="th" scope="row">
                {v.pet_Type}
              </TableCell>

              <TableCell component="th" scope="row">
                {v.pet_name}
              </TableCell>

              <TableCell component="th" scope="row">
                {v.pet_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {v.pet_name}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
