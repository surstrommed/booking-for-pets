import React from "react";
import { LinearProgress, Box, Alert, AlertTitle } from "@mui/material";
import { preloaderStyles } from "./auxiliaryStyles";
import { IPreloader } from "../../server/api/api-models";

const Loader = () => {
  return (
    <Box sx={preloaderStyles.loader}>
      <LinearProgress color="secondary" />
    </Box>
  );
};

export const Preloader = ({
  promiseName,
  promiseState,
  sub,
  modal,
}: IPreloader) => {
  return (
    <>
      {!promiseState[promiseName] ||
      promiseState[promiseName]?.status === "RESOLVED" ? (
        sub
      ) : promiseState[promiseName]?.status === "REJECTED" ? (
        promiseState[promiseName]?.error?.message ? (
          <>
            <Alert
              severity="error"
              style={modal ? preloaderStyles.modal : preloaderStyles.main}
            >
              <AlertTitle>Error</AlertTitle>
              {promiseState[promiseName]?.error?.message}
            </Alert>
            <br />
            {sub}
          </>
        ) : (
          <>{sub}</>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};
