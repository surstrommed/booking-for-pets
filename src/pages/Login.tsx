import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CSignIn } from "./../components/Signin";

export default function Login() {
  return (
    <Box style={{ marginTop: "10%", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom component="div">
        Fill in the fields to login to your account:
      </Typography>
      <div id="signInError"></div>
      <CSignIn />
    </Box>
  );
}
