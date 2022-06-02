import React, { useState, useEffect } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { forOwnersStyles } from "./forOwnersStyles";
import { useFormik } from "formik";
import {
  CurrencyModel,
  EditingHotelDataValues,
  HotelModel,
} from "../../server/api/api-models";
import { editingHotelVS } from "../../helpers/validationSchemes";
import useSnackBar from "../Auxiliary/SnackBar";
import { EDIT_HOTEL, siteCurrencyList } from "../../helpers/consts";
import { Transition } from "../Auxiliary/Transition";
import { hotelAPI } from "../../store/reducers/HotelService";
import { formateUser } from "../../helpers/functions";
import { Preloader } from "../Auxiliary/Preloader";

export const FullWindowHotelEditing = ({ hotelId, updateOpenDialogStatus }) => {
  const currentUser = formateUser();

  const {
    data: allHotels,
    error: hotelsError,
    isLoading: hotelsLoading,
  } = hotelAPI.useFetchAllHotelsQuery("");

  const [
    updateHotel,
    { isLoading: updateHotelLoading, error: updateHotelError },
  ] = hotelAPI.useUpdateHotelMutation();

  const [open, setOpen] = useState(true);
  const [, sendSnackbar] = useSnackBar();

  const currentHotel = (allHotels || []).find(
    (hotel: HotelModel) => hotel.id === hotelId
  );

  const currentCurrency = (siteCurrencyList || []).find(
    (currency: CurrencyModel) => currentUser?.currencyId === currency?.id
  );

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      updateOpenDialogStatus(hotelId);
    } else {
      updateOpenDialogStatus(0);
    }
  }, [open]);

  const initialValues: EditingHotelDataValues = {
    name: currentHotel.name,
    location: currentHotel.location,
    address: currentHotel.address,
    description: currentHotel.description,
    hotelRooms: currentHotel.hotelRooms,
    price: currentHotel.price,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: editingHotelVS,
    onSubmit: (values) => {
      updateHotel({
        ...currentHotel,
        name: values.name,
        location: values.location,
        address: values.address,
        description: values.description,
        hotelRooms: values.hotelRooms,
        price: values.price,
      });

      if (typeof sendSnackbar === "function" && !updateHotelError?.data) {
        sendSnackbar({
          msg: EDIT_HOTEL,
          variant: "warning",
        });

        updateOpenDialogStatus(0);
      }
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    formik;

  const disableSaveHotelButton =
    currentHotel.name === values.name &&
    currentHotel.location === values.location &&
    currentHotel.address === values.address &&
    currentHotel.description === values.description &&
    currentHotel.hotelRooms === values.hotelRooms &&
    currentHotel.price === values.price;

  return (
    <Preloader
      isLoading={hotelsLoading || updateHotelLoading}
      error={hotelsError?.data || updateHotelError?.data}
    >
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={forOwnersStyles.header}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <ArrowBackIosNewOutlinedIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div>
            <Typography
              variant="h3"
              display="block"
              gutterBottom
              align="center"
            >
              Hotel editing: {currentHotel?.name}
            </Typography>
            <form onSubmit={handleSubmit} style={forOwnersStyles.form}>
              <TextField
                id="name"
                name="name"
                label="Hotel name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                color="secondary"
                fullWidth
                sx={forOwnersStyles.formField}
              />
              <br />
              <TextField
                id="location"
                name="location"
                label="Hotel location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                color="secondary"
                fullWidth
                sx={forOwnersStyles.formField}
              />
              <br />
              <TextField
                id="address"
                name="address"
                label="Hotel address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                color="secondary"
                fullWidth
                sx={forOwnersStyles.formField}
              />
              <br />
              <TextField
                id="description"
                name="description"
                label="Hotel description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                color="secondary"
                fullWidth
                multiline
                sx={forOwnersStyles.formField}
              />
              <br />
              <TextField
                id="hotelRooms"
                name="hotelRooms"
                label="Hotel rooms"
                type="number"
                color="secondary"
                value={values.hotelRooms}
                onChange={handleChange}
                error={touched.hotelRooms && Boolean(errors.hotelRooms)}
                helperText={touched.hotelRooms && errors.hotelRooms}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                }}
                variant="standard"
                fullWidth
                sx={forOwnersStyles.formField}
              />
              <br />
              <TextField
                id="price"
                name="price"
                label="Room price per night"
                type="number"
                color="secondary"
                value={values.price}
                onChange={handleChange}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      {currentCurrency?.sign}
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                fullWidth
                sx={forOwnersStyles.formField}
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={disableSaveHotelButton}
                sx={forOwnersStyles.saveButton}
              >
                Save hotel
              </Button>
            </form>
          </div>
        </Dialog>
      </div>
    </Preloader>
  );
};
