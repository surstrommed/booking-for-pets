import React from "react";
import { connect } from "react-redux";
import { RootState } from "../App";

const HotelPage = ({ promise }) => {
  return <div></div>;
};

export const CHotelPage = connect((state: RootState) => ({
  promise: state.promise,
}))(HotelPage);
