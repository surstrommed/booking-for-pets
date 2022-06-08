import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { hotelPageStyles } from "./hotelsStyles";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import { ModalWindow } from "./../Auxiliary/ModalWindow";
import { SelectWishlist } from "../Wishlist/SelectWishlist";
import useSnackBar from "./../Auxiliary/SnackBar";
import { ShareWindow } from "./../Share/ShareWindow";
import { WishlistModel } from "../../server/api/api-models";
import {
  formateUser,
  unsaveHotelFromWishlist,
  updateJwtToken,
} from "../../helpers/functions";
import { usersAPI } from "../../store/reducers/UserService";
import { Preloader } from "../Auxiliary/Preloader";

export const HotelHeader = ({ hotelData }) => {
  const currentUser = formateUser();

  const [openWishlistWindow, setOpenWishlistWindow] = useState(false);
  const [openShareWindow, setOpenShareWindow] = useState(false);
  const [, sendSnackbar] = useSnackBar();

  const updateWishlistWindow = (value: boolean) => {
    setOpenWishlistWindow(value);
  };

  const updateShareWindow = (value: boolean) => {
    setOpenShareWindow(value);
  };

  const currentUserWishlists = currentUser?.wishlists;

  const isSaved = (currentUserWishlists || []).find((wishlist: WishlistModel) =>
    wishlist.hotelsId.includes(hotelData.id)
  );

  const [userUpdate, { isLoading: userUpdateLoading, error: userUpdateError }] =
    usersAPI.useUpdateUserMutation();

  return (
    <Preloader isLoading={userUpdateLoading} error={userUpdateError?.data}>
      {openWishlistWindow && (
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
      {openShareWindow && (
        <ModalWindow
          title={"Share this hotel"}
          body={<ShareWindow />}
          modalWindowState={updateShareWindow}
        />
      )}
      <Typography variant="h3" gutterBottom component="div">
        {hotelData?.name}
      </Typography>
      <Typography
        sx={hotelPageStyles.blockInfo}
        variant="overline"
        display="block"
        gutterBottom
      >
        <div>
          <ScrollLink to="reviews" style={hotelPageStyles.link}>
            {hotelData?.reviews?.length} review(s)
          </ScrollLink>{" "}
          · {hotelData?.location}
        </div>
        <div style={hotelPageStyles.alignCenter}>
          <Button
            color="secondary"
            variant="text"
            style={hotelPageStyles.link}
            onClick={() => setOpenShareWindow(true)}
          >
            <span style={hotelPageStyles.alignCenter}>
              <IosShareOutlinedIcon /> Share
            </span>
          </Button>
          <Button
            color="secondary"
            variant="text"
            style={hotelPageStyles.link}
            disabled={!Object.keys(currentUser)?.length}
            onClick={() =>
              isSaved
                ? unsaveHotelFromWishlist({
                    hotelData,
                    isSaved,
                    currentUser,
                    userUpdate,
                    userUpdateError,
                    sendSnackbar,
                  })
                : setOpenWishlistWindow(true)
            }
          >
            <span style={hotelPageStyles.alignCenter}>
              {isSaved ? (
                <>
                  <GradeIcon />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <GradeOutlinedIcon />
                  <span>Save</span>
                </>
              )}
            </span>
          </Button>
        </div>
      </Typography>
    </Preloader>
  );
};
