import React from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
import { CHotelCard } from "./HotelCard";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { spaceAfterComma } from "./../../helpers/index";

const HotelsList = ({ promise }) => {
  const params = useParams();
  const locationParameter = params?.location
    ? spaceAfterComma(params.location)
    : "";
  const arrivalParameter = params?.arrive || "";
  const departureParameter = params?.departure || "";
  const numberParameter = params?.number || "";

  const dateAvailabilityCheck = (freeRooms) => {
    let checkFlag = true;
    if (Object.keys(freeRooms).length > 0) {
      const freeRoomsKeys = Object.keys(freeRooms);

      const checkArrival = freeRoomsKeys.some(
        (userId) => userId === arrivalParameter
      );

      const checkDeparture = freeRoomsKeys.some(
        (userId) => userId === departureParameter
      );

      if (checkArrival) {
        if (freeRooms[arrivalParameter].availableSeats - +numberParameter < 0) {
          checkFlag = false;
        }
      }

      if (checkDeparture) {
        if (
          freeRooms[departureParameter].availableSeats - +numberParameter <
          0
        ) {
          checkFlag = false;
        }
      }
    }
    return checkFlag;
  };

  const hotels = promise?.getHotels?.payload?.filter(
    (hotel) =>
      hotel.location === locationParameter &&
      dateAvailabilityCheck(hotel.freeRooms)
  );

  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        {hotels.length} hotels found according to your request
      </Typography>
      <div className="HotelsList">
        {(hotels || []).map((hotel, index) => (
          <CHotelCard
            key={index}
            hotelData={{
              index,
              id: hotel.id,
              image: hotel.photos[0],
              title: hotel.name,
              description: hotel.description,
              price: hotel.price,
            }}
          />
        ))}
      </div>
    </>
  );
};

export const CHotelsList = connect((state: RootState) => ({
  promise: state.promise,
}))(HotelsList);
