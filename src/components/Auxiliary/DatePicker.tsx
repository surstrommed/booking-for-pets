import React from "react";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import TextField from "@mui/material/TextField";

export const DatePicker = ({ type, formik, disableFnc }) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      name={type === "arrival" ? "dateArrival" : "dateDeparture"}
      id={type === "arrival" ? "dateArrival" : "dateDeparture"}
    >
      <DesktopDatePicker
        label={type === "arrival" ? "Arrival" : "Departure"}
        inputFormat="dd/MM/yyyy"
        value={
          type === "arrival"
            ? formik.values?.dateArrival
            : formik.values?.dateDeparture
        }
        shouldDisableDate={disableFnc}
        onChange={(value) => {
          formik.setFieldValue(
            type === "arrival" ? "dateArrival" : "dateDeparture",
            value
          );
        }}
        minDate={
          type === "arrival"
            ? new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
            : new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
        }
        renderInput={(params) => <TextField {...params} color="secondary" />}
      />
    </LocalizationProvider>
  );
};
