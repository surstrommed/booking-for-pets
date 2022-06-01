import React from "react";
import { Box } from "@mui/material";
import { SignUp } from "./../components/Auth/Signup";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { RootState } from "../helpers/types";
import { useSelector } from "react-redux";

export const Register = () => {
  const promise = useSelector((state: RootState) => state.promise);

  return (
    <Box>
      <Preloader
        promiseName={"signup"}
        promiseState={promise}
        sub={<SignUp />}
      />
    </Box>
  );
};
