import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import errorSign from "./../assets/img/404.png";

export default function Page404() {
  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <img src={errorSign} />
      <Typography variant="subtitle1" gutterBottom component="div">
        Sorry, but this page was not found.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home
      </Button>
    </div>
  );
}
