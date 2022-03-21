import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export const HotelCard = ({ index, id, image, title, description, price }) => {
  return (
    <Link to={`/hotels/${id}`}>
      <Card sx={{ width: 245, height: 300 }}>
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
              {description}
              <br />
              {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
