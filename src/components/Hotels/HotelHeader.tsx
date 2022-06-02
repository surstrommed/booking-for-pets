import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { hotelPageStyles } from "./hotelsStyles";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import { ModalWindow } from "./../Auxiliary/ModalWindow";
import { SelectWishlist } from "../Wishlist/SelectWishlist";
import { useSelector } from "react-redux";
import { RootState } from "../../helpers/types";
import { actionUpdateWishlists as onUnsave } from "../../actions/thunks";
import useSnackBar from "./../Auxiliary/SnackBar";
import { ShareWindow } from "./../Share/ShareWindow";
import { sendSnackBarMessages } from "../../helpers/consts";
import { WishlistModel } from "../../server/api/api-models";

export const HotelHeader = ({ currentHotel }) => {
  const auth = useSelector((state: RootState) => state.auth);

  const [openWishlistWindow, setOpenWishlistWindow] = useState(false);
  const [openShareWindow, setOpenShareWindow] = useState(false);
  const [, sendSnackbar] = useSnackBar();

  const updateWishlistWindow = (value: boolean) => {
    setOpenWishlistWindow(value);
  };

  const updateShareWindow = (value: boolean) => {
    setOpenShareWindow(value);
  };

  const currentUserWishlists = auth?.payload?.wishlists;

  const isSaved = (currentUserWishlists || []).find((wishlist: WishlistModel) =>
    wishlist.hotelsId.includes(currentHotel.id)
  );

  function handleUnsave() {
    const isSavedIndex = (currentUserWishlists || []).findIndex(
      (wishlist: WishlistModel) => wishlist.hotelsId.includes(currentHotel.id)
    );

    const filteredHotelsId = isSaved.hotelsId.filter(
      (hotelId: string) => hotelId !== currentHotel.id
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
    <div>
      {openWishlistWindow && (
        <ModalWindow
          title={"Your choice"}
          body={
            <SelectWishlist
              modalWindowState={updateWishlistWindow}
              currentHotel={currentHotel}
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
        {currentHotel?.name}
      </Typography>
      <Typography
        sx={hotelPageStyles.blockInfo}
        variant="overline"
        display="block"
        gutterBottom
      >
        <div>
          <ScrollLink to="reviews" style={hotelPageStyles.link}>
            {currentHotel?.reviews?.length} review(s)
          </ScrollLink>{" "}
          · {currentHotel?.location}
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
            disabled={!auth?.token}
            onClick={saved ? handleUnsave : () => setOpenWishlistWindow(true)}
          >
            <span style={hotelPageStyles.alignCenter}>
              {saved ? (
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
    </div>
  );
};
