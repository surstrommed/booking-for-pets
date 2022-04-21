import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { connect } from "react-redux";
import { RootState } from "./../components/App";
import { links } from "./../helpers/index";
import { pagesStyles } from "./pagesStyles";
import { history } from "./../components/App";

const Wishlists = ({ auth, promise }) => {
  const currentUserWishlists = auth?.payload.wishlists;
  const allHotels = promise?.getHotels?.payload;

  return (
    <Box sx={pagesStyles.wishlists.main}>
      <Typography variant="h2" component="div" gutterBottom>
        Wishlists
      </Typography>
      <Box sx={pagesStyles.wishlists.cards}>
        {currentUserWishlists.length === 0 ? (
          <Typography variant="h6" component="div" gutterBottom>
            You currently have no wishlists
          </Typography>
        ) : (
          (currentUserWishlists || []).map((wishlist, index) => (
            <Card key={index} sx={pagesStyles.wishlists.card}>
              <CardActionArea
                onClick={() =>
                  history.push(`/wishlists/wishlist/${wishlist.name}`)
                }
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    (allHotels || []).find(
                      (hotel) => hotel.id === wishlist?.hotelsId?.[0]
                    )?.photos?.[0] || links.noBackground
                  }
                  alt={`Wishlist ${index + 1}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {wishlist.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export const CWishlists = connect((state: RootState) => ({
  auth: state.auth,
  promise: state.promise,
}))(Wishlists);
