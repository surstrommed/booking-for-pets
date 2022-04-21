import React from "react";
import { useFormik } from "formik";
import { CustomTextField } from "../Auxiliary/CustomTextField";
import { Button, Typography } from "@mui/material";
import { connect } from "react-redux";
import { actionUpdateWishlists } from "../../actions/thunks";
import { RootState } from "../App";
import useSnackBar from "./../Auxiliary/SnackBar";
import { wishlistVS } from "../../helpers/validationSchemes";
import { sendSnackBarMessages } from "../../helpers";

const CreateWishlist = ({
  auth,
  onCreateWishlist,
  modalWindowState,
  hotelData,
}) => {
  const currentUserWishlists = auth?.payload.wishlists;
  const initialValues: { wishlistName: string } = { wishlistName: "" };

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
      (wishlist) => wishlist.name === values.wishlistName
    )
  ) {
    errors.wishlistName = "Wishlist with the same name already exists";
  }

  const [, sendSnackbar] = useSnackBar();

  function sendSnackBar() {
    values.wishlistName &&
      !errors.wishlistName &&
      sendSnackbar({
        msg: sendSnackBarMessages.createdWishlistMessage(values.wishlistName),
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

export const CCreateWishlist = connect(
  (state: RootState) => ({ auth: state.auth, promise: state.promise }),
  {
    onCreateWishlist: actionUpdateWishlists,
  }
)(CreateWishlist);
