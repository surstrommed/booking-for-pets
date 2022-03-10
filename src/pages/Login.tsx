import React from "react";
import AuthForm from "../components/AuthForm";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Login() {
  return (
    <Box style={{ marginTop: "10%", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom component="div">
        Fill in the fields to login to your account:
      </Typography>
      <AuthForm />
    </Box>
  );
}
