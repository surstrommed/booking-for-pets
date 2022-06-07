import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import {
  formateUser,
  truncText,
  unsaveHotelFromWishlist,
} from "../../helpers/functions";
import { siteCurrencyList } from "../../helpers/consts";
import useSnackBar from "./../Auxiliary/SnackBar";
import { WishlistSettings } from "./WishlistSettings";
import {
  CurrencyModel,
  WishlistModel,
  HotelModel,
} from "../../server/api/api-models";
import { ButtonEvent } from "../../helpers/types";
import { Preloader } from "../Auxiliary/Preloader";
import { hotelAPI } from "../../store/reducers/HotelService";
import { currencyAPI } from "../../store/reducers/CurrencyService";
import { usersAPI } from "../../store/reducers/UserService";

export const WishlistPage = () => {
  const currentUser = formateUser();

  const navigate = useNavigate();

  const {
    data: allHotels,
    error: hotelsError,
    isLoading: hotelsLoading,
  } = hotelAPI.useFetchAllHotelsQuery("");

  const {
    data: currencyList,
    error: currencyError,
    isLoading: currencyLoading,
  } = currencyAPI.useFetchAllCurrencyQuery("");

  const [userUpdate, { isLoading: userUpdateLoading, error: userUpdateError }] =
    usersAPI.useUpdateUserMutation();

  const { wishlistName } = useParams();
  const [, sendSnackbar] = useSnackBar();
  const currentUserWishlists = currentUser?.wishlists;

  const currentCurrency = siteCurrencyList.find(
    (currency: CurrencyModel) => currentUser?.currencyId === currency?.id
  );

  const currentWishlist =
    (currentUserWishlists || [])?.find(
      (wishlist: WishlistModel) => wishlist.name === wishlistName
    ) || {};

  const likedHotels = [];
  if (!!currentWishlist?.hotelsId?.length && !!allHotels?.length) {
    for (const hotelId of currentWishlist.hotelsId) {
      for (const hotel of allHotels) {
        if (hotel.id === hotelId) {
          likedHotels.push(hotel);
        }
      }
    }
  }

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event: ButtonEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Preloader
      isLoading={hotelsLoading || currencyLoading || userUpdateLoading}
      error={hotelsError?.data || currencyError?.data || userUpdateError?.data}
    >
      <Box sx={wishlistStyles.wishlistPageBox}>
        <AppBar sx={wishlistStyles.wishlistPageBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate("/wishlists")}
              aria-label="close"
            >
              <ArrowBackIosNewOutlinedIcon />
            </IconButton>
            <Typography
              sx={wishlistStyles.space}
              variant="h6"
              component="div"
            ></Typography>
            <IconButton sx={wishlistStyles.black} onClick={handleOpenUserMenu}>
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
              <WishlistSettings
                currentWishlist={currentWishlist}
                currentWishlists={currentUserWishlists}
                handleClose={handleCloseUserMenu}
              />
            </Menu>
          </Toolbar>
        </AppBar>
        <Box>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            data-testid="wishlist-name"
          >
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
                    onClick={() => navigate(`/hotels/hotel/${hotel.id}`)}
                  >
                    <Typography variant="h6" display="block" gutterBottom>
                      &nbsp;&nbsp;&nbsp;{hotel.name}
                    </Typography>
                    <Typography variant="body2" display="block" gutterBottom>
                      &nbsp;&nbsp;&nbsp;{truncText(hotel.description, 20)}
                    </Typography>
                    <Typography variant="body2" display="block" gutterBottom>
                      &nbsp;&nbsp;&nbsp;{currentCurrency?.sign}
                      {Math.round(
                        +(
                          hotel?.price *
                          currencyList?.rates[currentCurrency?.name]
                        ).toFixed(1)
                      )}
                    </Typography>
                  </CardActionArea>
                  <CardActions>
                    <IconButton
                      color="secondary"
                      onClick={() =>
                        unsaveHotelFromWishlist({
                          hotelData: hotel,
                          isSaved: currentWishlist,
                          currentUser,
                          userUpdate,
                          userUpdateError,
                          sendSnackbar,
                        })
                      }
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
    </Preloader>
  );
};
