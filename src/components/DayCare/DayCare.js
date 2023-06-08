import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

export default function DayCare() {
  const [daycareData, setDaycareData] = useState([]);
  const [daycare, setDaycare] = useState();

  const toEdit = (ID, edit, val) => {
    axios
      .get(`http://localhost:5000/api/daycare/${ID}`)
      .then((response) => {
        console.log(response.data);
        setDaycare(response.data);
        setDaycare((prevState) => ({
          ...prevState,
          [edit]: val,
        }));
        if (daycare) {
          axios
            .put(`http://localhost:5000/api/daycare/${ID}`, daycare)
            .then(setDaycare(null));
        }
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/daycare");
        setDaycareData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching daycare data:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(daycareData);

  return (
    <div>
      {daycareData.map((entry) => (
        <div
          key={entry._id}
          style={{ width: "90%", marginTop: "6%", marginLeft: "5%" }}
        >
          <Accordion disabled={entry.approvedcheck}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{entry.pickupadress}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{/* ?? add button */}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion disabled={entry.pickedupstatus || !entry.approvedcheck}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion disabled={entry.dropoffstatus || !entry.pickedupstatus}>
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
      ))}
    </div>
  );
}
