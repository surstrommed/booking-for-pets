import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function AuthForm({ signup }: any) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        id="outlined-login-input"
        label="Login"
        autoComplete="current-login"
      />
      <br />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
      />
      <br />
      {signup && (
        <>
          <TextField
            required
            id="outlined-password-input-retry"
            label="Retry password"
            type="password"
            autoComplete="current-password-retry"
          />
          <br />
        </>
      )}
      {signup ? (
        <>
          <Button component={Link} to="/" variant="contained" color="primary">
            Sign up
          </Button>
          <div style={{ marginTop: "2vh" }}>
            <Typography variant="subtitle1" gutterBottom component="div">
              Already have an account?
            </Typography>
            <Button component={Link} to="/signin">
              Sign In
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button component={Link} to="/" variant="contained" color="primary">
            Sign In
          </Button>
          <div style={{ marginTop: "2vh" }}>
            <Typography variant="subtitle1" gutterBottom component="div">
              Don&#96;t have an account yet?
            </Typography>
            <Button component={Link} to="/signup">
              Sign Up
            </Button>
          </div>
        </>
      )}
    </Box>
  );
}
