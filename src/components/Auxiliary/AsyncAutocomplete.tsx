import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { getHotels } from "./../../server/api/api";
import { uniqueArray } from "../../helpers/functions";
import { autocompleteStyles } from "./auxiliaryStyles";
import { HotelModel } from "src/server/api/api-models";

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
        (hotel: HotelModel) => hotel.location
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={autocompleteStyles.main}
      open={open}
      onSelect={updateLocation}
      onOpen={handleOpen}
      onClose={handleClose}
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
              <>
                {loading && (
                  <CircularProgress
                    color="inherit"
                    size={20}
                    sx={autocompleteStyles.loading}
                  />
                )}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
