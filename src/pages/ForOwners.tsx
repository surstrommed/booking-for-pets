import React from "react";
import { history } from "../components/App";
import { RootState } from "../helpers/types";
import { connect } from "react-redux";
import { Typography, Button, TextField, InputAdornment } from "@mui/material";
import { EditingHotelDataValues } from "../server/api/api-models";
import { useFormik } from "formik";
import { pagesStyles } from "./pagesStyles";
import { editingHotelVS } from "../helpers/validationSchemes";
import { actionFullHotelCreate } from "../actions/thunks";
import { getUniqueId } from "../helpers/functions";
import useSnackBar from "../components/Auxiliary/SnackBar";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { CurrencyModel } from "../server/api/api-models";
import { RESOLVED_PROMISE_STATUS, CREATED_HOTEL } from "../helpers/consts";

const ForOwners = ({ auth, promise, onHotelCreate, currencyList }) => {
  const { payload: allHotels } = promise.getHotels || [];

  const currencySiteList = currencyList?.currency;

  const currentCurrency = (currencySiteList || []).find(
    (currency: CurrencyModel) => auth?.payload?.currencyId === currency?.id
  );

  const currencyExchangeList = currencyList?.exchangeList;

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

    onSubmit: (values) => {
      onHotelCreate({
        id: getUniqueId(allHotels),
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
        owner: auth.payload.id,
        reviews: [],
      });

      if (typeof sendSnackbar === "function") {
        promise.hotelCreate.status === RESOLVED_PROMISE_STATUS &&
          sendSnackbar({
            msg: CREATED_HOTEL,
            variant: "success",
          });
      }
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    formik;

  const checkCreatedHotels = allHotels?.some(
    (hotel) => hotel.owner === auth?.payload?.id
  );

  const viewCreatedHotels = () => history.push("/for-owners/hotels");

  if (values.description.length > 300) {
    errors.description = "Description cannot exceed 300 characters";
  }

  return (
    <div style={pagesStyles.forOwners.main}>
      <div style={pagesStyles.forOwners.leftBlock}>
        <Typography
          sx={pagesStyles.forOwners.leftBlockText}
          variant="h3"
          gutterBottom
          component="div"
        >
          {auth?.payload?.firstName}, create a page for your hotel by filling
          out the form on the right
        </Typography>
        {checkCreatedHotels ? (
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
  );
};

export const CForOwners = connect(
  (state: RootState) => ({
    auth: state.auth,
    promise: state.promise,
    currencyList: state.currencyList,
  }),
  {
    onHotelCreate: actionFullHotelCreate,
  }
)(ForOwners);
