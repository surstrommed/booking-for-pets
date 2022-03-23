import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { preloaderStyles } from "./auxiliaryStyles";

const Loader = () => {
  return (
    <Box sx={preloaderStyles.loader}>
      <LinearProgress color="secondary" />
    </Box>
  );
};

export const Preloader = ({ promiseName, promiseState, sub, modal }) => {
  return (
    <>
      {!promiseState[promiseName] ||
      promiseState[promiseName]?.status === "RESOLVED" ? (
        sub
      ) : promiseState[promiseName]?.status === "REJECTED" ? (
        <>
          <Alert
            severity="error"
            style={modal ? preloaderStyles.modal : preloaderStyles.main}
          >
            <AlertTitle>Error</AlertTitle>
            {promiseState[promiseName]?.["error"]?.["message"]}
          </Alert>
          {sub}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
