import React from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
import { HotelCard } from "./HotelCard";

const HotelsList = ({ promise }) => {
  const hotels = promise?.getHotels?.payload;
  return (
    <div className="HotelsList">
      {(hotels || []).map((hotel, index) => (
        <HotelCard
          key={index}
          index
          id={hotel.id}
          image={hotel.photos[0]}
          title={hotel.name}
          description={hotel.description}
          price={hotel.price}
        />
      ))}
    </div>
  );
};

export const CHotelsList = connect((state: RootState) => ({
  promise: state.promise,
}))(HotelsList);
