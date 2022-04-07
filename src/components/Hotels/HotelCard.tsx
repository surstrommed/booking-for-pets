import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../App";
import { connect } from "react-redux";
import { actionFullHotelUpdate } from "./../../actions/thunks";
import { truncText } from "../../helpers/index";
import { hotelCardStyles } from "./hotelsStyle";

const HotelCard = ({ hotelData, hotelUpdate }) => {
  return (
    <Link to={`/hotels/hotel/${hotelData.id}`}>
      <Card
        sx={hotelCardStyles.main}
        onClick={() => hotelUpdate({ id: hotelData.id })}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`${hotelData.image}`}
            alt={`Hotel ${hotelData.index + 1}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {hotelData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truncText(hotelData.description)}
              <br />
              {hotelData.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export const CHotelCard = connect(
  (state: RootState) => ({
    promise: state.promise,
  }),
  {
    hotelUpdate: actionFullHotelUpdate,
  }
)(HotelCard);
