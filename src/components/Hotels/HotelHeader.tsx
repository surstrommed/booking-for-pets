import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { hotelPageStyles } from "./hotelsStyles";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import ModalWindow from "./../Auxiliary/ModalWindow";
import { CSelectWishlist } from "../Wishlist/SelectWishlist";
import { connect } from "react-redux";
import { RootState } from "../App";
import { actionUpdateWishlists } from "../../actions/thunks";
import useSnackBar from "./../Auxiliary/SnackBar";
import { ShareWindow } from "./../Share/ShareWindow";
import { sendSnackBarMessages } from "../../helpers";

const HotelHeader = ({ auth, currentHotel, onUnsave }) => {
  const [openWishlistWindow, setOpenWishlistWindow] = useState(false);
  const [openShareWindow, setOpenShareWindow] = useState(false);
  const [, sendSnackbar] = useSnackBar();

  const updateWishlistWindow = (value) => {
    setOpenWishlistWindow(value);
  };

  const updateShareWindow = (value) => {
    setOpenShareWindow(value);
  };

  const currentUserWishlists = auth?.payload?.wishlists;

  const isSaved = (currentUserWishlists || []).find((wishlist) =>
    wishlist.hotelsId.includes(currentHotel.id)
  );

  function handleUnsave() {
    const isSavedIndex = (currentUserWishlists || []).findIndex((wishlist) =>
      wishlist.hotelsId.includes(currentHotel.id)
    );

    const filteredHotelsId = isSaved.hotelsId.filter(
      (hotelId) => hotelId !== currentHotel.id
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
    <div>
      {openWishlistWindow && (
        <ModalWindow
          title={"Your choice"}
          body={
            <CSelectWishlist
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

export const CHotelHeader = connect(
  (state: RootState) => ({
    auth: state.auth,
    promise: state.promise,
  }),
  {
    onUnsave: actionUpdateWishlists,
  }
)(HotelHeader);
