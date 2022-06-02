import React from "react";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import { EditingHotelDataValues, HotelModel } from "../server/api/api-models";
import { useFormik } from "formik";
import { pagesStyles } from "./pagesStyles";
import { editingHotelVS } from "../helpers/validationSchemes";
import { createUniqueId, formateUser } from "../helpers/functions";
import useSnackBar from "../components/Auxiliary/SnackBar";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { CurrencyModel } from "../server/api/api-models";
import { CREATED_HOTEL, siteCurrencyList } from "../helpers/consts";
import { useNavigate } from "react-router-dom";
import { currencyAPI } from "../store/reducers/CurrencyService";
import { hotelAPI } from "../store/reducers/HotelService";
import { Preloader } from "../components/Auxiliary/Preloader";

export const ForOwners = () => {
  const currentUser = formateUser();

  const {
    data: currencyList,
    error: currencyError,
    isLoading: currencyLoading,
  } = currencyAPI.useFetchAllCurrencyQuery("");

  const {
    data: allHotels,
    error: hotelsError,
    isLoading: hotelsLoading,
  } = hotelAPI.useFetchAllHotelsQuery("");

  const [
    createHotel,
    { isLoading: createHotelLoading, error: createHotelError },
  ] = hotelAPI.useCreateHotelMutation();

  const navigate = useNavigate();

  const currentCurrency = (siteCurrencyList || []).find(
    (currency: CurrencyModel) => currentUser?.currencyId === currency?.id
  );

  const currencyExchangeList = currencyList?.rates;

  const [, sendSnackbar] = useSnackBar();

  const initialValues: EditingHotelDataValues = {
    name: "",
    location: "",
    address: "",
    description: "",
    hotelRooms: 1,
    price: 5,
    // photos: [],
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: editingHotelVS,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: (values, { resetForm }) => {
      createHotel({
        id: createUniqueId(),
        name: values.name,
        location: values.location,
        address: values.address,
        description: values.description,
        photos: [],
        hotelRooms: values.hotelRooms,
        freeRooms: {},
        userRequests: [],
        disableUserDates: {},
        disableUsersDates: [],
        price:
          currentCurrency.id === 1
            ? +values.price
            : Math.round(
                +(
                  values.price / currencyExchangeList[currentCurrency.name]
                ).toFixed(1)
              ),
        owner: currentUser?.id,
        reviews: [],
      });

      resetForm();

      if (typeof sendSnackbar === "function" && !hotelsError?.data) {
        sendSnackbar({
          msg: CREATED_HOTEL,
          variant: "success",
        });
      }
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    formik;

  const checkUserCreatedHotels = allHotels?.some(
    (hotel: HotelModel) => hotel.owner === currentUser?.id
  );

  const viewCreatedHotels = () => navigate("/for-owners/hotels");

  if (values.description.length > 300) {
    errors.description = "Description cannot exceed 300 characters";
  }

  return (
    <Preloader
      isLoading={currencyLoading || hotelsLoading || createHotelLoading}
      error={currencyError?.data || hotelsError?.data || createHotelError?.data}
    >
      <div style={pagesStyles.forOwners.main}>
        <div style={pagesStyles.forOwners.leftBlock}>
          <Typography
            sx={pagesStyles.forOwners.leftBlockText}
            variant="h3"
            gutterBottom
            component="div"
          >
            {currentUser?.firstName}, create a page for your hotel by filling
            out the form on the right
          </Typography>
          {checkUserCreatedHotels ? (
            <Button
              variant="contained"
              sx={pagesStyles.forOwners.viewHotelButton}
              onClick={viewCreatedHotels}
            >
              <span>
                View my hotels&nbsp;
                <ArrowCircleRightIcon sx={pagesStyles.forOwners.iconCenter} />
              </span>
            </Button>
          ) : (
            <Typography
              variant="h6"
              display="block"
              align="center"
              color="primary"
              gutterBottom
            >
              You have no hotels created yet
            </Typography>
          )}
        </div>
        <div style={pagesStyles.forOwners.rightBlock}>
          <form onSubmit={handleSubmit} style={pagesStyles.forOwners.form}>
            <Typography
              variant="body2"
              display="block"
              align="center"
              gutterBottom
            >
              All fields to fill are required
            </Typography>
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
              sx={pagesStyles.forOwners.formField}
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
              sx={pagesStyles.forOwners.formField}
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
              sx={pagesStyles.forOwners.formField}
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
              sx={pagesStyles.forOwners.formField}
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
              sx={pagesStyles.forOwners.formField}
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
              sx={pagesStyles.forOwners.formField}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={pagesStyles.forOwners.saveButton}
            >
              Create hotel
            </Button>
          </form>
        </div>
      </div>
    </Preloader>
  );
};
