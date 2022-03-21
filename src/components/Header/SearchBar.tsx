import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import { searchBar } from "./headerStyles";
import { AsyncAutocomplete } from "./../Auxiliary/AsyncAutocomplete";

export default function SearchBar({ styles }) {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <div style={styles}>
      <ButtonGroup
        variant="text"
        aria-label="Search fields"
        sx={searchBar.buttonGroup}
      >
        <Box>
          <AsyncAutocomplete />
        </Box>
        <Divider orientation="vertical" flexItem sx={searchBar.divider} />
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Arrival"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Divider orientation="vertical" flexItem sx={searchBar.divider} />
        <Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Departure"
              inputFormat="MM/dd/yyyy"
              value={value}
              onChange={handleChange}
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
        <Button variant="contained" sx={searchBar.searchButton}>
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
