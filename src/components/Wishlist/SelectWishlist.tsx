import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { wishlistStyles } from "./wishlistStyles";
import ModalWindow from "../Auxiliary/ModalWindow";
import { links, sendSnackBarMessages } from "../../helpers";
import { connect } from "react-redux";
import { RootState } from "../App";
import { actionUpdateWishlists } from "../../actions/thunks";
import { CCreateWishlist } from "./CreateWishlist";
import useSnackBar from "./../Auxiliary/SnackBar";

const SelectWishlist = ({
  auth,
  promise,
  modalWindowState,
  onSelect,
  currentHotel,
}) => {
  const currentUserWishlists = auth?.payload?.wishlists;
  const allHotels = promise?.getHotels?.payload;

  const [openCreateWishlistWindow, setOpenCreateWishlistWindow] =
    useState(false);

  const updateCreateWishlistWindow = (value) => {
    setOpenCreateWishlistWindow(value);
    modalWindowState(value);
  };

  const [, sendSnackbar] = useSnackBar();

  function handleSave(wishlistName: string) {
    const isSavedIndex = (currentUserWishlists || []).findIndex(
      (wishlist) => wishlist.name === wishlistName
    );

    const filteredUserWishlists = [...currentUserWishlists];

    const filteredCurrentUserWishlist = {
      ...currentUserWishlists[isSavedIndex],
      hotelsId: [
        ...currentUserWishlists[isSavedIndex].hotelsId,
        currentHotel.id,
      ],
    };

    filteredUserWishlists.splice(isSavedIndex, 1);

    filteredUserWishlists.push(filteredCurrentUserWishlist);

    sendSnackbar({
      msg: sendSnackBarMessages.addedToWishlistMessage(wishlistName),
    });

    onSelect(filteredUserWishlists);
  }

  return (
    <div>
      {openCreateWishlistWindow && (
        <ModalWindow
          title={"Name your new wishlist"}
          body={
            <CCreateWishlist
              modalWindowState={updateCreateWishlistWindow}
              hotelData={currentHotel}
            />
          }
          modalWindowState={updateCreateWishlistWindow}
        />
      )}
      <Button
        variant="text"
        color="secondary"
        sx={wishlistStyles.addWishlist}
        onClick={() => setOpenCreateWishlistWindow(true)}
      >
        <AddBoxOutlinedIcon sx={wishlistStyles.addWishlist.addIcon} />
        &nbsp;&nbsp;Create wishlist
      </Button>
      <div>
        {(currentUserWishlists || []).map((wishlist, index) => (
          <Card key={index} sx={wishlistStyles.wishlistCard}>
            <CardMedia
              component="img"
              sx={wishlistStyles.width100}
              image={
                (allHotels || []).find(
                  (hotel) => hotel.id === wishlist?.hotelsId?.[0]
                )?.photos?.[0] || links.noBackground
              }
              alt={wishlist.name}
            />
            <CardActionArea onClick={() => handleSave(wishlist.name)}>
              <Typography variant="h6" display="block" gutterBottom>
                &nbsp;&nbsp;&nbsp;{wishlist.name}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const CSelectWishlist = connect(
  (state: RootState) => ({ auth: state.auth, promise: state.promise }),
  {
    onSelect: actionUpdateWishlists,
  }
)(SelectWishlist);
