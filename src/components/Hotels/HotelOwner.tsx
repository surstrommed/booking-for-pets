import React from "react";
import { Card, CardHeader, Avatar } from "@mui/material";
import { hotelPageStyles } from "./hotelsStyles";
import { Link } from "react-router-dom";
import { stringMonth } from "../../helpers/functions";
import { links } from "../../helpers/consts";
import { UserModel } from "../../server/api/api-models";

export const HotelOwner = ({ currentHotel, users }) => {
  const hotelOwner = (users || []).find(
    (user: UserModel) => user.id === currentHotel.owner
  );
  return (
    <div style={hotelPageStyles.dFlex}>
      <Card sx={hotelPageStyles.owner}>
        <CardHeader
          avatar={
            <Link to={`/users/${hotelOwner?.id}`}>
              <Avatar
                alt={`${hotelOwner?.firstName} ${hotelOwner?.lastName}`}
                src={`${hotelOwner?.pictureUrl || links.noAvatar}`}
                sx={{ width: 56, height: 56 }}
              />
            </Link>
          }
          title={`Owner: ${hotelOwner?.firstName} ${hotelOwner?.lastName}`}
          subheader={`On Shaggy tail since ${stringMonth(
            new Date(hotelOwner?.createdAt).getMonth()
          )} ${new Date(hotelOwner?.createdAt).getFullYear()}`}
        />
      </Card>
    </div>
  );
};
