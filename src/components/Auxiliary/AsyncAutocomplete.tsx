import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { uniqueArray } from "../../helpers/functions";
import { autocompleteStyles } from "./auxiliaryStyles";
import { HotelModel } from "../../server/api/api-models";
import { hotelAPI } from "../../store/reducers/HotelService";

export const AsyncAutocomplete = ({ updateLocation }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const { data: allHotels, isLoading: hotelsLoading } =
    hotelAPI.useFetchAllHotelsQuery("");

  useEffect(() => {
    let active = true;

    (() => {
      const citiesCountries = (allHotels || []).map(
        (hotel: HotelModel) => hotel.location
      );

      if (active) {
        setOptions([...uniqueArray(citiesCountries)]);
      }
    })();
    return () => {
      active = false;
    };
  }, [open]);

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
      loading={hotelsLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {hotelsLoading && (
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
