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
import { CreateWishlist } from "./CreateWishlist";
import useSnackBar from "./../Auxiliary/SnackBar";
import { HotelModel, WishlistModel } from "../../server/api/api-models";
import { formateUser, updateJwtToken } from "../../helpers/functions";
import { hotelAPI } from "../../store/reducers/HotelService";
import { Preloader } from "../Auxiliary/Preloader";
import { usersAPI } from "../../store/reducers/UserService";

export const SelectWishlist = ({ modalWindowState, currentHotel }) => {
  const currentUser = formateUser();

  const {
    data: allHotels,
    error: hotelsError,
    isLoading: hotelsLoading,
  } = hotelAPI.useFetchAllHotelsQuery("");

  const [userUpdate, { isLoading: userUpdateLoading, error: userUpdateError }] =
    usersAPI.useUpdateUserMutation();

  const currentUserWishlists = currentUser?.wishlists;

  const [openCreateWishlistWindow, setOpenCreateWishlistWindow] =
    useState(false);

  const updateCreateWishlistWindow = (value: boolean) => {
    setOpenCreateWishlistWindow(value);
    modalWindowState(value);
  };

  const [, sendSnackbar] = useSnackBar();

  const handleSave = async (wishlistName: string) => {
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

    const response = await userUpdate({
      ...currentUser,
      password: currentUser?.password,
      wishlists: filteredUserWishlists,
    });

    if (response?.data) {
      updateJwtToken({ ...response?.data, password: currentUser?.password });
    }

    if (typeof sendSnackbar === "function") {
      sendSnackbar({
        msg: sendSnackBarMessages.addedToWishlistMessage(wishlistName),
        variant: "success",
      });
      modalWindowState(false);
    }
  };

  return (
    <Preloader
      isLoading={hotelsLoading || userUpdateLoading}
      error={hotelsError || userUpdateError}
    >
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
    </Preloader>
  );
};
