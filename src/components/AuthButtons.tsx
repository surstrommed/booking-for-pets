import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function AuthButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/signin"
      >
        Sign In
      </Button>
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/signup"
      >
        Sign Up
      </Button>
    </Stack>
  );
}
