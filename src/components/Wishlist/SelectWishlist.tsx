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
import { ModalWindow } from "../Auxiliary/ModalWindow";
import {
  links,
  NEW_WISHLIST_MODAL_TITLE,
  sendSnackBarMessages,
} from "../../helpers/consts";
import { useSelector } from "react-redux";
import { RootState } from "../../helpers/types";
import { actionUpdateWishlists as onSelect } from "../../actions/thunks";
import { CreateWishlist } from "./CreateWishlist";
import useSnackBar from "./../Auxiliary/SnackBar";
import { HotelModel, WishlistModel } from "../../server/api/api-models";

export const SelectWishlist = ({ modalWindowState, currentHotel }) => {
  const promise = useSelector((state: RootState) => state.promise);
  const auth = useSelector((state: RootState) => state.auth);

  const currentUserWishlists = auth?.payload?.wishlists;
  const allHotels = promise?.getHotels?.payload;

  const [openCreateWishlistWindow, setOpenCreateWishlistWindow] =
    useState(false);

  const updateCreateWishlistWindow = (value: boolean) => {
    setOpenCreateWishlistWindow(value);
    modalWindowState(value);
  };

  const [, sendSnackbar] = useSnackBar();

  function handleSave(wishlistName: string) {
    const isSavedIndex = (currentUserWishlists || []).findIndex(
      (wishlist: WishlistModel) => wishlist.name === wishlistName
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

    if (typeof sendSnackbar === "function") {
      sendSnackbar({
        msg: sendSnackBarMessages.addedToWishlistMessage(wishlistName),
        variant: "success",
      });
    }

    onSelect(filteredUserWishlists);
  }

  return (
    <div>
      {openCreateWishlistWindow && (
        <ModalWindow
          title={NEW_WISHLIST_MODAL_TITLE}
          body={
            <CreateWishlist
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
        {(currentUserWishlists || []).map(
          (wishlist: WishlistModel, index: number) => (
            <Card key={index} sx={wishlistStyles.wishlistCard}>
              <CardMedia
                component="img"
                sx={wishlistStyles.width100}
                image={
                  (allHotels || []).find(
                    (hotel: HotelModel) => hotel.id === wishlist?.hotelsId?.[0]
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
          )
        )}
      </div>
    </div>
  );
};
