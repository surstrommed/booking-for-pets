import React from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
import { HotelCard } from "./HotelCard";
import { useParams } from "react-router-dom";
import { spaceAfterComma } from "./../../helpers/index";
import { Typography } from "@mui/material";

const HotelsList = ({ promise }) => {
  const params = useParams();
  const locationParameter = params?.location
    ? spaceAfterComma(params.location)
    : "";
  const arrivalParameter = params?.arrive ? spaceAfterComma(params.arrive) : "";
  const departureParameter = params?.departure
    ? spaceAfterComma(params.departure)
    : "";
  const numberParameter = params?.number ? spaceAfterComma(params.number) : "";

  console.log(params);

  const hotels = locationParameter
    ? promise?.getHotels?.payload.filter(
        (hotel) =>
          hotel.location === locationParameter &&
          numberParameter <= 10 &&
          hotel.freeRooms >= numberParameter
      )
    : promise?.getHotels?.payload;

  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        {hotels.length} hotels found according to your request
      </Typography>
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
    </>
  );
};

export const CHotelsList = connect((state: RootState) => ({
  promise: state.promise,
}))(HotelsList);
