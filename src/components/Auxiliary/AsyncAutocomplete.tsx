import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { getHotels } from "./../../server/api/api";
import { uniqueArray } from "../../helpers";
import { autocompleteStyles } from "./auxiliaryStyles";

export const AsyncAutocomplete = ({ updateLocation }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    (async () => {
      const citiesCountries = ((await getHotels()) || []).map(
        (hotel) => hotel.location
      );
      if (active) {
        setOptions([...uniqueArray(citiesCountries)]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={autocompleteStyles.main}
      open={open}
      onSelect={updateLocation}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress
                    color="inherit"
                    size={20}
                    sx={autocompleteStyles.loading}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
