import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
} from "@mui/material";
import { CardActionArea, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { hotelCardStyles } from "./hotelsStyles";
import {
  formateUser,
  truncText,
  unsaveHotelFromWishlist,
} from "../../helpers/functions";
import { links, siteCurrencyList } from "../../helpers/consts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ModalWindow } from "./../Auxiliary/ModalWindow";
import { SelectWishlist } from "./../Wishlist/SelectWishlist";
import useSnackBar from "./../Auxiliary/SnackBar";
import { CurrencyModel, WishlistModel } from "../../server/api/api-models";
import { usersAPI } from "../../store/reducers/UserService";
import { currencyAPI } from "../../store/reducers/CurrencyService";
import { hotelAPI } from "../../store/reducers/HotelService";
import { Preloader } from "../Auxiliary/Preloader";

export const HotelCard = ({ hotelData }) => {
  const currentUser = formateUser();

  const [openWishlistsWindow, setOpenWishlistsWindow] = useState(false);
  const [, sendSnackbar] = useSnackBar();

  const currentCurrency = (siteCurrencyList || []).find(
    (currency: CurrencyModel) => currentUser?.currencyId === currency?.id
  );

  const updateWishlistWindow = (value: boolean) => {
    setOpenWishlistsWindow(value);
  };

  const currentUserWishlists = currentUser?.wishlists;

  const isSaved = (currentUserWishlists || []).find((wishlist: WishlistModel) =>
    wishlist.hotelsId.includes(hotelData.id)
  );

  const [userUpdate, { isLoading: userUpdateLoading, error: userUpdateError }] =
    usersAPI.useUpdateUserMutation();

  const {
    data: currencyList,
    error: currencyError,
    isLoading: currencyLoading,
  } = currencyAPI.useFetchAllCurrencyQuery("");

  return (
    <Preloader
      isLoading={userUpdateLoading || currencyLoading}
      error={userUpdateError?.data || currencyError?.data}
    >
      <Card sx={hotelCardStyles.main}>
        {openWishlistsWindow && (
          <ModalWindow
            title={"Your choice"}
            body={
              <SelectWishlist
                modalWindowState={updateWishlistWindow}
                currentHotel={hotelData}
              />
            }
            modalWindowState={updateWishlistWindow}
          />
        )}
        <Link to={`/hotels/hotel/${hotelData.id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={hotelData.image || links.noImage}
              alt={`Hotel ${hotelData.index + 1}`}
            />
            <CardContent sx={{ height: "20vh" }}>
              <Typography gutterBottom variant="h6" component="div">
                {hotelData.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {truncText(hotelData.description, 70)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          {isSaved ? (
            <>
              <Typography variant="body1" color="text.secondary">
                <b>
                  {currentCurrency?.sign}
                  {Math.round(
                    +(
                      hotelData?.price *
                      currencyList?.rates[currentCurrency?.name]
                    ).toFixed(1)
                  )}{" "}
                  / day
                </b>
              </Typography>
              <IconButton
                color="secondary"
                sx={hotelCardStyles.rightAlign}
                disabled={!Object.keys(currentUser)?.length}
                onClick={() =>
                  unsaveHotelFromWishlist({
                    hotelData,
                    isSaved,
                    currentUser,
                    userUpdate,
                    userUpdateError,
                    sendSnackbar,
                  })
                }
              >
                <FavoriteIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Typography variant="body1" color="text.secondary">
                <b>
                  {currentCurrency?.sign || "$"}
                  {Math.round(
                    +(
                      hotelData?.price *
                      currencyList?.rates[currentCurrency?.name]
                    ).toFixed(1) || hotelData.price
                  )}{" "}
                  / day
                </b>
              </Typography>
              <IconButton
                color="secondary"
                sx={hotelCardStyles.rightAlign}
                disabled={!Object.keys(currentUser)?.length}
                onClick={() => setOpenWishlistsWindow(true)}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
    </Preloader>
  );
};
