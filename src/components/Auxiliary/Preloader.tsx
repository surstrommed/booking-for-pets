import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import ModalWindow from "./ModalWindow";

const Loader = () => {
  return (
    <Box sx={{ width: "50%", marginLeft: "25%", marginTop: "10%" }}>
      <LinearProgress color="secondary" />
    </Box>
  );
};

export const Preloader = ({ promiseName, promiseState, sub }) => {
  return (
    <>
      {!promiseState[promiseName] ||
      promiseState[promiseName]?.status === "RESOLVED" ? (
        sub
      ) : promiseState[promiseName]?.status === "REJECTED" ? (
        <ModalWindow
          title="Error"
          body={promiseState[promiseName]?.["error"]?.["message"]}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};
