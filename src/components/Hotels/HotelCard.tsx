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
import { RootState } from "../../helpers/types";
import { useSelector } from "react-redux";
import { hotelCardStyles } from "./hotelsStyles";
import {
  actionFullHotelUpdate as hotelUpdate,
  actionUpdateWishlists as onUnsave,
} from "./../../actions/thunks";
import { truncText } from "../../helpers/functions";
import { links, sendSnackBarMessages } from "../../helpers/consts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ModalWindow } from "./../Auxiliary/ModalWindow";
import { SelectWishlist } from "./../Wishlist/SelectWishlist";
import useSnackBar from "./../Auxiliary/SnackBar";
import { CurrencyModel, WishlistModel } from "src/server/api/api-models";

export const HotelCard = ({ hotelData }) => {
  const auth = useSelector((state: RootState) => state.promise);
  const currencyList = useSelector((state: RootState) => state.promise);

  const [openWishlistsWindow, setOpenWishlistsWindow] = useState(false);
  const [, sendSnackbar] = useSnackBar();

  const currentCurrency = (currencyList?.currency || []).find(
    (currency: CurrencyModel) => auth?.payload?.currencyId === currency?.id
  );

  const updateWishlistWindow = (value: boolean) => {
    setOpenWishlistsWindow(value);
  };

  const currentUserWishlists = auth?.payload?.wishlists;

  const isSaved = (currentUserWishlists || []).find((wishlist: WishlistModel) =>
    wishlist.hotelsId.includes(hotelData.id)
  );

  function handleUnsave() {
    const isSavedIndex = (currentUserWishlists || []).findIndex(
      (wishlist: WishlistModel) => wishlist.hotelsId.includes(hotelData.id)
    );

    const filteredHotelsId = isSaved.hotelsId.filter(
      (hotelId: string) => hotelId !== hotelData.id
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
        msg: sendSnackBarMessages.removedFromWishlistMessage(isSaved?.name),
        variant: "error",
      });
    }

    onUnsave(filteredUserWishlists);
  }

  const [saved] = useState(isSaved ? true : false);

  return (
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
        <CardActionArea onClick={() => hotelUpdate({ id: hotelData.id })}>
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
        {saved ? (
          <>
            <Typography variant="body1" color="text.secondary">
              <b>
                {currentCurrency?.sign}
                {hotelData.price *
                  currencyList?.exchangeList[currentCurrency?.name]?.toFixed(
                    1
                  )}{" "}
                / day
              </b>
            </Typography>
            <IconButton
              color="secondary"
              sx={hotelCardStyles.rightAlign}
              disabled={!auth?.token}
              onClick={handleUnsave}
            >
              <FavoriteIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="body1" color="text.secondary">
              <b>
                {currentCurrency?.sign || "$"}
                {hotelData.price *
                  currencyList?.exchangeList[currentCurrency?.name]?.toFixed(
                    1
                  ) || hotelData.price}{" "}
                / day
              </b>
            </Typography>
            <IconButton
              color="secondary"
              sx={hotelCardStyles.rightAlign}
              disabled={!auth?.token}
              onClick={() => setOpenWishlistsWindow(true)}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};
