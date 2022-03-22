import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CSignIn } from "./../components/Auth/Signin";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { connect } from "react-redux";
import { RootState } from "../components/App";

const Login = connect((state: RootState) => ({
  promise: state.promise,
}))(({ promise }) => {
  return (
    <Box style={{ marginTop: "10%", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom component="div">
        Fill in the fields to login to your account:
      </Typography>
      <Preloader
        promiseName={"signin"}
        promiseState={promise}
        sub={<CSignIn />}
      />
    </Box>
  );
});

export default Login;
