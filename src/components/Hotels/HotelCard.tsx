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
import { RootState } from "../App";
import { connect } from "react-redux";
import {
  actionFullHotelUpdate,
  actionUpdateWishlists,
} from "./../../actions/thunks";
import { sendSnackBarMessages, truncText } from "../../helpers/index";
import { hotelCardStyles } from "./hotelsStyles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModalWindow from "./../Auxiliary/ModalWindow";
import { CSelectWishlist } from "./../Wishlist/SelectWishlist";
import useSnackBar from "./../Auxiliary/SnackBar";

const HotelCard = ({
  auth,
  hotelData,
  hotelUpdate,
  currencyList,
  onUnsave,
}) => {
  const [openWishlistsWindow, setOpenWishlistsWindow] = useState(false);
  const [, sendSnackbar] = useSnackBar();

  const currentCurrency = (currencyList?.currency || []).find(
    (currency) => auth?.payload?.currencyId === currency?.id
  );

  const updateWishlistWindow = (value) => {
    setOpenWishlistsWindow(value);
  };

  const currentUserWishlists = auth?.payload?.wishlists;

  const isSaved = (currentUserWishlists || []).find((wishlist) =>
    wishlist.hotelsId.includes(hotelData.id)
  );

  function handleUnsave() {
    const isSavedIndex = (currentUserWishlists || []).findIndex((wishlist) =>
      wishlist.hotelsId.includes(hotelData.id)
    );

    const filteredHotelsId = isSaved.hotelsId.filter(
      (hotelId) => hotelId !== hotelData.id
    );

    const filteredUserWishlists = [...currentUserWishlists];

    filteredUserWishlists.splice(isSavedIndex, 1);

    const filteredCurrentUserWishlist = {
      ...currentUserWishlists[isSavedIndex],
      hotelsId: filteredHotelsId,
    };

    filteredUserWishlists.push(filteredCurrentUserWishlist);

    sendSnackbar({
      msg: sendSnackBarMessages.hotelRemovedMessage(isSaved?.name),
    });

    onUnsave(filteredUserWishlists);
  }

  const [saved] = useState(isSaved ? true : false);

  return (
    <Card sx={hotelCardStyles.main}>
      {openWishlistsWindow && (
        <ModalWindow
          title={"Your choice"}
          body={
            <CSelectWishlist
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
            image={`${hotelData.image}`}
            alt={`Hotel ${hotelData.index + 1}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {hotelData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {truncText(hotelData.description)}
              <br />
              {currentCurrency?.sign}
              {hotelData.price *
                currencyList.exchangeList[currentCurrency.name].toFixed(1)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        {saved ? (
          <>
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

export const CHotelCard = connect(
  (state: RootState) => ({
    promise: state.promise,
    auth: state.auth,
    currencyList: state.currencyList,
  }),
  {
    hotelUpdate: actionFullHotelUpdate,
    onUnsave: actionUpdateWishlists,
  }
)(HotelCard);
