import React from "react";
import { CustomTextField } from "./../Auxiliary/CustomTextField";
import { useFormik } from "formik";
import {
  Box,
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { wishlistVS } from "../../helpers/validationSchemes";
import { connect } from "react-redux";
import { RootState } from "../../helpers/types";
import { actionUpdateWishlists } from "../../actions/thunks";
import { history } from "./../App";
import { WishlistModel } from "../../server/api/api-models";
import { RENAME_ERROR_WISHLIST } from "../../helpers/consts";
import { wishlistStyles } from "./wishlistStyles";
import { wishlistName } from "../../helpers/types";

const WishlistSettings = ({
  handleClose,
  currentWishlist,
  currentWishlists,
  onDelete,
  onRename,
}) => {
  const initialValues: wishlistName = { wishlistName: "" };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: wishlistVS,
    onSubmit: (values) => {
      const currentWishlistIndex = (currentWishlists || []).findIndex(
        (wishlist: WishlistModel) => wishlist.name === currentWishlist.name
      );

      const filteredUserWishlists = [...currentWishlists];

      filteredUserWishlists.splice(currentWishlistIndex, 1);

      const filteredCurrentUserWishlist = {
        name: values.wishlistName,
        hotelsId: [...currentWishlist.hotelsId],
      };

      filteredUserWishlists.push(filteredCurrentUserWishlist);

      onRename(filteredUserWishlists);

      history.push(`/wishlists/wishlist/${values.wishlistName}`);
    },
  });

  const { handleSubmit, handleChange, values, touched, errors } = formik;

  if (currentWishlist.name === values.wishlistName) {
    errors.wishlistName = RENAME_ERROR_WISHLIST;
  }

  function deleteWishlist() {
    const filteredCurrentWishlists = (currentWishlists || []).filter(
      (wishlist: WishlistModel) => wishlist.name !== currentWishlist.name
    );

    onDelete(filteredCurrentWishlists);

    history.push("/wishlists");
  }

  return (
    <div>
      <AppBar sx={wishlistStyles.wishlistAppBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
            variant="h6"
            component="div"
          >
            Settings
          </Typography>
          <Button
            sx={{ ml: 2 }}
            autoFocus
            color="inherit"
            onClick={deleteWishlist}
          >
            Delete
          </Button>
        </Toolbar>
      </AppBar>
      <hr />
      <Box style={{ padding: "5vh" }}>
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
          <Button
            sx={{ marginTop: "5vh" }}
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
          >
            Save
          </Button>
        </form>
      </Box>
    </div>
  );
};

export const CWishlistSettings = connect(
  (state: RootState) => ({
    auth: state.auth,
  }),
  {
    onDelete: actionUpdateWishlists,
    onRename: actionUpdateWishlists,
  }
)(WishlistSettings);
