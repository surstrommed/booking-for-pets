import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./../App";
import { RootState } from "../../helpers/types";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  Menu,
} from "@mui/material";
import { wishlistStyles } from "./wishlistStyles";
import { truncText } from "../../helpers/functions";
import { sendSnackBarMessages } from "../../helpers/consts";
import { actionUpdateWishlists } from "../../actions/thunks";
import useSnackBar from "./../Auxiliary/SnackBar";
import { CWishlistSettings } from "./WishlistSettings";
import {
  CurrencyModel,
  WishlistModel,
  HotelModel,
} from "src/server/api/api-models";
import { ButtonEvent } from "../../helpers/types";
import { Loader } from "../Auxiliary/Preloader";

const WishlistPage = ({ auth, promise, currencyList, onUnsave }) => {
  const { wishlistName } = useParams();
  const [, sendSnackbar] = useSnackBar();
  const currentUserWishlists = auth?.payload.wishlists;

  const currentCurrency = (currencyList?.currency || []).find(
    (currency: CurrencyModel) => auth?.payload?.currencyId === currency?.id
  );

  const currentWishlist =
    (currentUserWishlists || [])?.find(
      (wishlist: WishlistModel) => wishlist.name === wishlistName
    ) || {};

  const allHotels = promise?.getHotels?.payload;

  const likedHotels = [];
  for (const hotelId of currentWishlist.hotelsId || []) {
    for (const hotel of allHotels || []) {
      if (hotel.id === hotelId) {
        likedHotels.push(hotel);
      }
    }
  }

  function handleUnsave(hotelId: string) {
    const isSavedIndex = (currentUserWishlists || []).findIndex(
      (wishlist: WishlistModel) => wishlist?.hotelsId?.includes(hotelId)
    );

    const filteredHotelsId = currentWishlist?.hotelsId?.filter(
      (wishlistHotelId: string) => wishlistHotelId !== hotelId
    );

    const filteredUserWishlists = [...currentUserWishlists];

    filteredUserWishlists.splice(isSavedIndex, 1);

    const filteredCurrentUserWishlist = {
      ...currentUserWishlists[isSavedIndex],
      hotelsId: filteredHotelsId,
    };

    filteredUserWishlists.push(filteredCurrentUserWishlist);

    if (typeof sendSnackbar === "function") {
      sendSnackbar({
        msg: sendSnackBarMessages.removedFromWishlistMessage(
          currentWishlist.name
        ),
        variant: "success",
      });
    }

    onUnsave(filteredUserWishlists);
  }

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event: ButtonEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {Object.keys(currentWishlist).length > 0 ? (
        <Box sx={wishlistStyles.wishlistPageBox}>
          <AppBar sx={wishlistStyles.wishlistPageBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => history.push("/wishlists")}
                aria-label="close"
              >
                <ArrowBackIosNewOutlinedIcon />
              </IconButton>
              <Typography
                sx={wishlistStyles.space}
                variant="h6"
                component="div"
              ></Typography>
              <IconButton
                sx={wishlistStyles.black}
                onClick={handleOpenUserMenu}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <CWishlistSettings
                  currentWishlist={currentWishlist}
                  currentWishlists={currentUserWishlists}
                  handleClose={handleCloseUserMenu}
                />
              </Menu>
            </Toolbar>
          </AppBar>
          <Box>
            <Typography variant="h4" component="div" gutterBottom>
              {currentWishlist.name}
            </Typography>
            <Box sx={wishlistStyles.wishlistPageContent}>
              {likedHotels.length === 0 ? (
                <Typography variant="h6" component="div" gutterBottom>
                  This wishlist is empty
                </Typography>
              ) : (
                (likedHotels || []).map((hotel: HotelModel, index: number) => (
                  <Card key={index} sx={wishlistStyles.wishlistPageCard}>
                    <CardMedia
                      component="img"
                      sx={wishlistStyles.width100}
                      image={hotel.photos[0]}
                      alt={hotel.name}
                    />
                    <CardActionArea
                      onClick={() => history.push(`/hotels/hotel/${hotel.id}`)}
                    >
                      <Typography variant="h6" display="block" gutterBottom>
                        &nbsp;&nbsp;&nbsp;{hotel.name}
                      </Typography>
                      <Typography variant="body2" display="block" gutterBottom>
                        &nbsp;&nbsp;&nbsp;{truncText(hotel.description, 20)}
                      </Typography>
                      <Typography variant="body2" display="block" gutterBottom>
                        &nbsp;&nbsp;&nbsp;{currentCurrency?.sign}
                        {hotel.price *
                          currencyList.exchangeList[
                            currentCurrency.name
                          ].toFixed(1)}
                      </Typography>
                    </CardActionArea>
                    <CardActions>
                      <IconButton
                        color="secondary"
                        onClick={() => handleUnsave(hotel.id)}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export const CWishlistPage = connect(
  (state: RootState) => ({
    promise: state.promise,
    auth: state.auth,
    currencyList: state.currencyList,
  }),
  {
    onUnsave: actionUpdateWishlists,
  }
)(WishlistPage);
