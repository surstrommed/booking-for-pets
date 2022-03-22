import React, { useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import { searchBar } from "./headerStyles";
import { AsyncAutocomplete } from "./../Auxiliary/AsyncAutocomplete";
import { Link } from "react-router-dom";

export default function SearchBar({ styles }) {
  const [location, setLocation] = useState("");
  const [arrivalValue, setArrivalValue] = useState<Date | null>(new Date());
  const [departureValue, setDepartureValue] = useState<Date | null>(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  );
  const [numberValue, setNumberValue] = useState(1);

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleChangeArrival = (newValue: Date | null) => {
    setArrivalValue(newValue);
  };

  const handleChangeDeparture = (newValue: Date | null) => {
    setDepartureValue(newValue);
  };

  const handleChangeNumber = (e) => {
    setNumberValue(e.target.value);
  };

  return (
    <div style={styles}>
      <ButtonGroup
        variant="text"
        aria-label="Search fields"
        sx={searchBar.buttonGroup}
      >
        <Box>
          <AsyncAutocomplete updateLocation={handleChangeLocation} />
        </Box>
        <Divider orientation="vertical" flexItem sx={searchBar.divider} />
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Arrival"
              inputFormat="dd/MM/yyyy"
              value={arrivalValue}
              onChange={handleChangeArrival}
              minDate={new Date()}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Divider orientation="vertical" flexItem sx={searchBar.divider} />
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Departure"
              inputFormat="dd/MM/yyyy"
              value={departureValue}
              onChange={handleChangeDeparture}
              minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Divider orientation="vertical" flexItem sx={searchBar.divider} />
        <Box>
          <TextField
            id="standard-number"
            label="Number of animals"
            type="number"
            color="secondary"
            value={numberValue}
            onChange={handleChangeNumber}
            sx={searchBar.numberField}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                max: 10,
                min: 1,
              },
            }}
            variant="standard"
          />
        </Box>
        <Button
          variant="contained"
          sx={searchBar.searchButton}
          disabled={!location}
        >
          <Link
            to={`/hotels/${location.split(" ").join("")}/${Date.parse(
              arrivalValue
            )}/${Date.parse(departureValue)}/${numberValue}`}
          >
            <SearchIcon />
          </Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}
