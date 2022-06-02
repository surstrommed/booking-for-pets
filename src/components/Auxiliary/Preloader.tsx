import React from "react";
import { LinearProgress, Box, Alert, AlertTitle } from "@mui/material";
import { preloaderStyles } from "./auxiliaryStyles";
import { IPreloader } from "../../server/api/api-models";

export const Loader = () => {
  return (
    <Box sx={preloaderStyles.loader}>
      <LinearProgress color="secondary" />
    </Box>
  );
};

export const Preloader = ({
  isLoading,
  error,
  modal,
  children,
}: IPreloader) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <>
          <Alert
            severity="error"
            style={modal ? preloaderStyles.modal : preloaderStyles.main}
          >
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
          <br />
          {children}
        </>
      ) : (
        children
      )}
    </>
  );
};
