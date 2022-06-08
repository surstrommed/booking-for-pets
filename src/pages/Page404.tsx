import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { pagesStyles } from "./pagesStyles";
import { links } from "../helpers/consts";

export const Page404 = () => {
  return (
    <div style={pagesStyles.page404.main} data-testid="error-page">
      <img src={links.errorSign} />
      <Typography variant="subtitle1" gutterBottom component="div">
        Sorry, but this page was not found.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Home
      </Button>
    </div>
  );
};
