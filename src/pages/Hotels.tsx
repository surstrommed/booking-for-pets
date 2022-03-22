import React from "react";
import { connect } from "react-redux";
import { RootState } from "../components/App";
import { Preloader } from "../components/Auxiliary/Preloader";
import { CHotelsList } from "./../components/Hotels/HotelsList";

const Hotels = ({ promise }) => {
  return (
    <div>
      <Preloader
        promiseName={"getHotels"}
        promiseState={promise}
        sub={<CHotelsList />}
      />
    </div>
  );
};

export const CHotels = connect((state: RootState) => ({
  promise: state.promise,
}))(Hotels);
