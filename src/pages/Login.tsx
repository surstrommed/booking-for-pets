import React from "react";
import Box from "@mui/material/Box";
import { CSignIn } from "./../components/Auth/Signin";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { connect } from "react-redux";
import { RootState } from "../components/App";

const Login = connect((state: RootState) => ({
  promise: state.promise,
}))(({ promise }) => {
  return (
    <Box>
      <Preloader
        promiseName={"signin"}
        promiseState={promise}
        sub={<CSignIn />}
        modal={false}
      />
    </Box>
  );
});

export default Login;
