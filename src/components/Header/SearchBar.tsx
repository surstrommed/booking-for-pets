import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";

export default function SearchBar() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Box
      className="SearchBar"
      sx={{
        display: "flex",
        border: "1px solid white",
        borderRadius: 20,
        backgroundColor: "#fff",
        marginTop: 20,
        marginLeft: 30,
        "& > *": {
          color: "#000",
          width: 800,
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        },
      }}
    >
      <ButtonGroup variant="text" aria-label="text button group">
        <TextField
          label="Standard warning"
          variant="standard"
          color="secondary"
          placeholder="Enter city"
          focused
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <TextField
          id="standard-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
      </ButtonGroup>
    </Box>
  );
}
