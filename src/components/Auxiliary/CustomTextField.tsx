import React from "react";
import { alpha, styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export const CustomTextField = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.secondary.main,
    },
  },
  "& label.Mui-focused": {
    marginTop: 10,
  },
}));
