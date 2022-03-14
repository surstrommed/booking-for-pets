import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CSignUp } from "./../components/Signup";

export default function Register() {
  return (
    <Box style={{ marginTop: "10%", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom component="div">
        Fill in the fields to register an account:
      </Typography>
      <div id="signUpError"></div>
      <CSignUp />
    </Box>
  );
}
