import React from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";

export const DatePicker = ({ type, formik, disableFnc }) => {
  const { handleBlur, values, setFieldValue } = formik;
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      name={type === "arrival" ? "dateArrival" : "dateDeparture"}
    >
      <DesktopDatePicker
        label={type === "arrival" ? "Arrival" : "Departure"}
        inputFormat="dd/MM/yyyy"
        shouldDisableDate={disableFnc}
        onChange={(value) => {
          setFieldValue(
            type === "arrival" ? "dateArrival" : "dateDeparture",
            value
          );
        }}
        minDate={
          type === "arrival"
            ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            : new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
        }
        value={type === "arrival" ? values.dateArrival : values.dateDeparture}
        renderInput={(params) => (
          <TextField onBlur={handleBlur} {...params} color="secondary" />
        )}
      />
    </LocalizationProvider>
  );
};
