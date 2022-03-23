import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CSignUp } from "./../components/Auth/Signup";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { RootState } from "../components/App";
import { connect } from "react-redux";

const Register = connect((state: RootState) => ({
  promise: state.promise,
}))(({ promise }) => {
  return (
    <Box>
      <Preloader
        promiseName={"signup"}
        promiseState={promise}
        sub={<CSignUp />}
      />
    </Box>
  );
});

export default Register;
