import React from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import { hotelPageStyles } from "./hotelsStyle";
import { Link } from "react-router-dom";
import { noAvatar, stringMonth } from "../../helpers/index";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const HotelPage = ({ promise }) => {
  const { payload: currentHotel } = promise.hotelUpdate;

  const hotelPhotos = currentHotel.photos.map((photo, index) => ({
    img: photo,
    title: `Photo ${index + 1}`,
    rows: index === 0 ? 2 : null,
    cols: index === 0 ? 2 : null,
  }));

  return (
    <div style={hotelPageStyles.main}>
      <div>
        <Typography variant="h3" gutterBottom component="div">
          {currentHotel.name}
        </Typography>
        <Typography
          style={hotelPageStyles.smallInfo}
          variant="overline"
          display="block"
          gutterBottom
        >
          <Link to="/reviews" style={hotelPageStyles.link}>
            {currentHotel.reviews.length} review(s)
          </Link>{" "}
          · {currentHotel.location}
          <Link to="/save" style={hotelPageStyles.link}>
            <span style={hotelPageStyles.alignCenter}>
              <GradeOutlinedIcon /> Save
            </span>
          </Link>
        </Typography>
      </div>
      <div>
        <ImageList style={hotelPageStyles.gallery} cols={4}>
          {hotelPhotos.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.img, 50, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <hr />
      <div></div>
      <hr />
      <div>
        <Typography variant="h5" gutterBottom component="div">
          Description:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {currentHotel.description}
        </Typography>
      </div>
      <hr />
      <div>
        <Typography variant="h5" gutterBottom component="div">
          {currentHotel.reviews.length} review(s)
        </Typography>
        <div style={hotelPageStyles.reviews}>
          {currentHotel.reviews.map((review, index) => (
            <Card sx={hotelPageStyles.review} key={index}>
              <CardHeader
                avatar={
                  <Link to={`/users/${review.owner.id}`}>
                    <Avatar
                      alt={`${review.owner.firstName} ${review.owner.lastName}`}
                      src={`${review.owner.pictureUrl || noAvatar}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Link>
                }
                title={`${review.owner.firstName} ${review.owner.lastName}`}
                subheader={`${stringMonth(
                  new Date(review.createdAt).getMonth()
                )} ${new Date(review.createdAt).getDate()}, ${new Date(
                  review.createdAt
                ).getFullYear()}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {review.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <hr />
      <div>
        <Card sx={hotelPageStyles.review}>
          <CardHeader
            avatar={
              <Link to={`/users/${currentHotel.owner.id}`}>
                <Avatar
                  alt={`${currentHotel.owner.firstName} ${currentHotel.owner.lastName}`}
                  src={`${currentHotel.owner.pictureUrl || noAvatar}`}
                  sx={{ width: 56, height: 56 }}
                />
              </Link>
            }
            title={`Onwer: ${currentHotel.owner.firstName} ${currentHotel.owner.lastName}`}
            subheader={`On Shaggy tail since ${stringMonth(
              new Date(currentHotel.owner.createdAt).getMonth()
            )} ${new Date(currentHotel.owner.createdAt).getFullYear()}`}
          />
        </Card>
      </div>
    </div>
  );
};

export const CHotelPage = connect((state: RootState) => ({
  promise: state.promise,
}))(HotelPage);
