import React from "react";
import Box from "@mui/material/Box";
import { SignIn } from "./../components/Auth/Signin";
import { Preloader } from "./../components/Auxiliary/Preloader";
import { useSelector } from "react-redux";
import { RootState } from "../helpers/types";

export const Login = () => {
  // const promise = useSelector((state: RootState) => state.promise);

  return (
    <Box>
      {/* <Preloader
        promiseName={"signin"}
        promiseState={promise}
        sub={<SignIn />}
      /> */}
      <SignIn />
    </Box>
  );
};
