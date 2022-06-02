import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../helpers/types";
import { links } from "../helpers/consts";
import { pagesStyles } from "./pagesStyles";
import { WishlistModel, HotelModel } from "../server/api/api-models";
import { useNavigate } from "react-router-dom";
import { formateUser } from "../helpers/functions";
import { hotelAPI } from "../store/reducers/HotelService";
import { Preloader } from "../components/Auxiliary/Preloader";

export const Wishlists = () => {
  const navigate = useNavigate();

  const currentUser = formateUser();

  const {
    data: allHotels,
    error: hotelsError,
    isLoading: hotelsLoading,
  } = hotelAPI.useFetchAllHotelsQuery("");

  const currentUserWishlists = currentUser?.wishlists;

  return (
    <Preloader isLoading={hotelsLoading} error={hotelsError}>
      <Box sx={pagesStyles.wishlists.main}>
        <Typography variant="h2" component="div" gutterBottom>
          Wishlists
        </Typography>
        <Box sx={pagesStyles.wishlists.cards}>
          {currentUserWishlists?.length === 0 ? (
            <Typography variant="h6" component="div" gutterBottom>
              You currently have no wishlists
            </Typography>
          ) : (
            (currentUserWishlists || []).map(
              (wishlist: WishlistModel, index: number) => (
                <Card key={index} sx={pagesStyles.wishlists.card}>
                  <CardActionArea
                    onClick={() =>
                      navigate(`/wishlists/wishlist/${wishlist?.name}`)
                    }
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        (allHotels || []).find(
                          (hotel: HotelModel) =>
                            hotel.id === wishlist?.hotelsId?.[0]
                        )?.photos?.[0] || links.noBackground
                      }
                      alt={`Wishlist ${index + 1}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {wishlist?.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            )
          )}
        </Box>
      </Box>
    </Preloader>
  );
};
