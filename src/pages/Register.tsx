import React from "react";
import { Box } from "@mui/material";
import { CSignUp } from "./../components/Auth/Signup";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { RootState } from "../helpers/types";
import { connect } from "react-redux";

const Register = ({ promise }) => (
  <Box>
    <Preloader
      promiseName={"signup"}
      promiseState={promise}
      sub={<CSignUp />}
    />
  </Box>
);

export const CRegister = connect((state: RootState) => ({
  promise: state.promise,
}))(Register);
