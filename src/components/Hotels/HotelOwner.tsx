import React from "react";
import { Card, CardHeader, Avatar } from "@mui/material";
import { hotelPageStyles } from "./hotelsStyles";
import { Link } from "react-router-dom";
import { links, stringMonth } from "../../helpers";

export const HotelOnwer = ({ currentHotel }) => {
  return (
    <div style={hotelPageStyles.dFlex}>
      <Card sx={hotelPageStyles.owner}>
        <CardHeader
          avatar={
            <Link to={`/users/${currentHotel?.owner?.id}`}>
              <Avatar
                alt={`${currentHotel?.owner?.firstName} ${currentHotel?.owner?.lastName}`}
                src={`${currentHotel?.owner?.pictureUrl || links.noAvatar}`}
                sx={{ width: 56, height: 56 }}
              />
            </Link>
          }
          title={`Onwer: ${currentHotel?.owner?.firstName} ${currentHotel?.owner?.lastName}`}
          subheader={`On Shaggy tail since ${stringMonth(
            new Date(currentHotel?.owner?.createdAt).getMonth()
          )} ${new Date(currentHotel?.owner?.createdAt).getFullYear()}`}
        />
      </Card>
    </div>
  );
};
