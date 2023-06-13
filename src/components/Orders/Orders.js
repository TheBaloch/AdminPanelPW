import * as React from "react";
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

const DateSelector = () => {
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

  React.useEffect(() => {
    console.log("Selected Days:", selectedDays);
    console.log("Selected Times:", selectedTimes);
  }, [selectedDays, selectedTimes]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-day-label">
          Select Days
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-day-label"
          id="demo-multiple-checkbox-day"
          multiple
          value={selectedDays}
          onChange={handleDayChange}
          input={<OutlinedInput label="Select Days" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              <Checkbox checked={selectedDays.indexOf(day) > -1} />
              <ListItemText primary={day} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-time-label">
          Select Times
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-time-label"
          id="demo-multiple-checkbox-time"
          multiple
          value={selectedTimes}
          onChange={handleTimeChange}
          input={<OutlinedInput label="Select Times" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {times.map((time) => (
            <MenuItem key={time} value={time}>
              <Checkbox checked={selectedTimes.indexOf(time) > -1} />
              <ListItemText primary={time} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DateSelector;
