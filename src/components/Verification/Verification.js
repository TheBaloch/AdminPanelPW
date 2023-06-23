import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Verify from "./Verify";
export default function Verification() {
  const [verify, setVerify] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/others/verification`
        );
        setVerify(response.data);
      } catch (error) {
        console.error("Error retrieving collection:", error);
      }
    };

    fetchData();
  }, []);

  if (!verify)
    return (
      <>
        <h1>Loading......</h1>
      </>
    );
  return (
    <>
      {verify.map((verify) => (
        <Verify key={verify.id} verify={verify} />
      ))}
      {/* <Accordion>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "400px" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Picture</TableCell>
                <TableCell align="right">pet name</TableCell>
                <TableCell align="right">Pet Type</TableCell>
                <TableCell align="right">Action</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Accordion> */}
    </>
  );
}
