import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../helpers/types";
import { HotelCard } from "./HotelCard";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { spaceFormatting } from "../../helpers/functions";
import { FreeRoomsModel, HotelModel } from "../../server/api/api-models";

export const HotelsList = () => {
  const promise = useSelector((state: RootState) => state.promise);

  const params = useParams();
  const locationParameter = params?.location
    ? spaceFormatting(params.location)
    : "";
  const arrivalParameter = params?.arrive || "";
  const departureParameter = params?.departure || "";
  const numberParameter = params?.number || "";

  const dateAvailabilityCheck = (freeRooms: FreeRoomsModel) => {
    let checkFlag = true;

    if (Object.keys(freeRooms).length > 0) {
      const freeRoomsKeys = Object.keys(freeRooms);

      const checkArrival = freeRoomsKeys.some(
        (date) => date === arrivalParameter
      );

      const checkDeparture = freeRoomsKeys.some(
        (date) => date === departureParameter
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

  const hotels =
    Object.keys(params).length === 0
      ? promise?.getHotels?.payload
      : promise?.getHotels?.payload?.filter(
          (hotel: HotelModel) =>
            hotel.location === locationParameter &&
            dateAvailabilityCheck(hotel.freeRooms)
        );

  const withoutDeleted = (hotels || []).filter((hotel) => hotel.owner !== 0);

  return (
    <>
      <Typography variant="h5" gutterBottom component="div" sx={{ padding: 5 }}>
        {withoutDeleted.length} hotels found according to your request
      </Typography>
      <div className="HotelsList">
        {(withoutDeleted || []).map((hotel: HotelModel, index: number) => (
          <div key={hotel.id}>
            <HotelCard
              hotelData={{
                index,
                id: hotel.id,
                image: hotel.photos[0],
                title: hotel.name,
                description: hotel.description,
                price: hotel.price,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
