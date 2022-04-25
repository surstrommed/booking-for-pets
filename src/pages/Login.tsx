import React from "react";
import Box from "@mui/material/Box";
import { CSignIn } from "./../components/Auth/Signin";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { connect } from "react-redux";
import { RootState } from "../helpers/types";

const Login = ({ promise }) => (
  <Box>
    <Preloader
      promiseName={"signin"}
      promiseState={promise}
      sub={<CSignIn />}
    />
  </Box>
);

export const CLogin = connect((state: RootState) => ({
  promise: state.promise,
}))(Login);
