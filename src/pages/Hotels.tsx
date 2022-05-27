import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../helpers/types";
import { Preloader } from "../components/Auxiliary/Preloader";
import { HotelsList } from "./../components/Hotels/HotelsList";
import { Box } from "@mui/material";

export const Hotels = () => {
  const promise = useSelector((state: RootState) => state.promise);

  return (
    <Box>
      <Preloader
        promiseName={"getHotels"}
        promiseState={promise}
        sub={<HotelsList />}
      />
    </Box>
  );
};
