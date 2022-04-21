import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
} from "@mui/material";
import { hotelPageStyles, hotelReviewStyles } from "./hotelsStyles";
import { Link } from "react-router-dom";
import { links, stringMonth } from "../../helpers";

export const HotelReviews = ({ currentHotel }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        {currentHotel?.reviews?.length} review(s)
      </Typography>
      <div style={hotelPageStyles.dFlex} id="reviews">
        {(currentHotel?.reviews || []).map((review, index) => (
          <Card sx={hotelReviewStyles.review} key={index}>
            <CardHeader
              avatar={
                <Link to={`/users/${review.owner.id}`}>
                  <Avatar
                    alt={`${review.owner.firstName} ${review.owner.lastName}`}
                    src={`${review.owner.pictureUrl || links.noAvatar}`}
                    sx={hotelReviewStyles.reviewAvatar}
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
  );
};
