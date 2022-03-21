import React from "react";
import { connect } from "react-redux";
import { actionGetHotels } from "../actions/index";
import { RootState } from "../components/App";
import { Preloader } from "../components/Auxiliary/Preloader";
import { CHotelsList } from "./../components/Hotels/HotelsList";

const Hotels = ({ promise, getHotels }) => {
  window.addEventListener("DOMContentLoaded", () => getHotels());
  return (
    <div>
      <h1>Hotels</h1>
      <Preloader
        promiseName={"getHotels"}
        promiseState={promise}
        sub={<CHotelsList />}
      />
    </div>
  );
};

export const CHotels = connect(
  (state: RootState) => ({ promise: state.promise }),
  {
    getHotels: actionGetHotels,
  }
)(Hotels);
