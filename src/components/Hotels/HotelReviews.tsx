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
import { formatStringDate } from "../../helpers/functions";
import { links } from "../../helpers/consts";
import { IReview } from "../../server/api/api-models";

export const HotelReviews = ({ currentHotel }) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom component="div">
        {currentHotel?.reviews?.length} review(s)
      </Typography>
      <div style={hotelPageStyles.dFlex} id="reviews">
        {(currentHotel?.reviews || []).map((review: IReview, index: number) => (
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
              subheader={formatStringDate(review.createdAt)}
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
