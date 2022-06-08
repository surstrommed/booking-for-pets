import React from "react";
import { useFormik } from "formik";
import { CustomTextField } from "../Auxiliary/CustomTextField";
import { Button, Typography } from "@mui/material";
import { wishlistVS } from "../../helpers/validationSchemes";
import { sendSnackBarMessages } from "../../helpers/consts";
import { WishlistModel } from "../../server/api/api-models";
import { ALREADY_EXIST_WISHLIST } from "../../helpers/consts";
import { wishlistName } from "../../helpers/types";
import { formateUser, updateJwtToken } from "../../helpers/functions";
import { usersAPI } from "../../store/reducers/UserService";
import { Preloader } from "../Auxiliary/Preloader";
import useSnackBar from "../Auxiliary/SnackBar";

export const CreateWishlist = ({ modalWindowState, hotelData }) => {
  const currentUser = formateUser();

  const currentUserWishlists = currentUser?.wishlists;
  const initialValues: wishlistName = { wishlistName: "" };

  const [userUpdate, { isLoading: userUpdateLoading, error: userUpdateError }] =
    usersAPI.useUpdateUserMutation();

  const [, sendSnackbar] = useSnackBar();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: wishlistVS,
    onSubmit: async (values) => {
      const wishlists = [
        ...currentUserWishlists,
        { name: values.wishlistName, hotelsId: [hotelData.id] },
      ];

      const response = await userUpdate({
        ...currentUser,
        password: currentUser?.password,
        wishlists,
      });

      if (response?.data) {
        updateJwtToken({ ...response?.data, password: currentUser?.password });
      }

      if (typeof sendSnackbar === "function" && !userUpdateError?.data) {
        sendSnackbar({
          msg: sendSnackBarMessages.createdWishlistMessage(values.wishlistName),
          variant: "success",
        });
        modalWindowState(false);
      }
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

  return (
    <Preloader isLoading={userUpdateLoading} error={userUpdateError}>
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
          From 2 to 20 characters without spaces
        </Typography>
        <br />
        <hr />
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Create wishlist
        </Button>
      </form>
    </Preloader>
  );
};
