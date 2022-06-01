import React from "react";
import { useFormik } from "formik";
import { CustomTextField } from "../Auxiliary/CustomTextField";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { actionUpdateWishlists as onCreateWishlist } from "../../actions/thunks";
import useSnackBar from "./../Auxiliary/SnackBar";
import { wishlistVS } from "../../helpers/validationSchemes";
import { sendSnackBarMessages } from "../../helpers/consts";
import { WishlistModel } from "../../server/api/api-models";
import { ALREADY_EXIST_WISHLIST } from "../../helpers/consts";
import { wishlistName, RootState } from "../../helpers/types";

export const CreateWishlist = ({ modalWindowState, hotelData }) => {
  const auth = useSelector((state: RootState) => state.auth);

  const currentUserWishlists = auth?.payload?.wishlists;
  const initialValues: wishlistName = { wishlistName: "" };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: wishlistVS,
    onSubmit: (values) => {
      const wishlists = [
        ...currentUserWishlists,
        { name: values.wishlistName, hotelsId: [hotelData.id] },
      ];

      modalWindowState(false);

      onCreateWishlist(wishlists);
    },
  });

  const { values, handleSubmit, handleChange, errors, touched } = formik;

  if (
    (currentUserWishlists || []).find(
      (wishlist: WishlistModel) => wishlist.name === values.wishlistName
    )
  ) {
    errors.wishlistName = ALREADY_EXIST_WISHLIST;
  }

  const [, sendSnackbar] = useSnackBar();

  function sendSnackBar() {
    values.wishlistName &&
      !errors.wishlistName &&
      typeof sendSnackbar === "function" &&
      sendSnackbar({
        msg: sendSnackBarMessages.createdWishlistMessage(values.wishlistName),
        variant: "success",
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          id="wishlistName"
          name="wishlistName"
          label="Wishlist name"
          value={values.wishlistName}
          onChange={handleChange}
          error={touched.wishlistName && Boolean(errors.wishlistName)}
          helperText={touched.wishlistName && errors.wishlistName}
          variant="outlined"
          color="secondary"
          fullWidth
        />
        <Typography variant="caption" display="block" gutterBottom>
          From 2 to 20 characters
        </Typography>
        <br />
        <hr />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          onClick={sendSnackBar}
        >
          Create wishlist
        </Button>
      </form>
    </div>
  );
};
