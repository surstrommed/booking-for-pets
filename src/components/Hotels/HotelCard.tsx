import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../App";
import { connect } from "react-redux";
import { actionFullHotelUpdate } from "./../../actions/thunks";
import { truncText } from "../../helpers/index";

const HotelCard = ({
  index,
  id,
  image,
  title,
  description,
  price,
  hotelUpdate,
}) => {
  return (
    <Link to={`/hotels/hotel/${id}`}>
      <Card
        sx={{ width: 245, height: 300 }}
        onClick={() => hotelUpdate({ id })}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`${image}`}
            alt={`Hotel ${index + 1}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truncText(description)}
              <br />
              {price}
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
