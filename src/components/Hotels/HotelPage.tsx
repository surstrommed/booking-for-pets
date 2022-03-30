import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { hotelPageStyles } from "./hotelsStyle";
import { Link } from "react-router-dom";
import { noAvatar, stringMonth, formatDate } from "../../helpers/index";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomTextField } from "./../Auxiliary/CustomTextField";
import Alert from "@mui/material/Alert";
import { actionFullHotelUpdate } from "./../../actions/thunks";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import FullWindowGallery from "./FullWindowGallery";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

interface HotelPageFormValues {
  dateArrival: Date | null;
  dateDeparture: Date | null;
  numberAnimals: number;
}

const HotelPage = ({ promise, auth, currencyList, onBooking }) => {
  const { payload: currentHotel } = promise.hotelUpdate;
  const [openDialog, setOpenDialog] = useState(false);
  const maxAnimals = 10;
  const currencySiteList = currencyList?.currency;
  const currencyExchangeList = currencyList?.exchangeList;
  const currentCurrency = (currencySiteList || []).find(
    (currency) => auth?.payload?.currency === currency?.id
  ) || { name: "USD", sign: "$" };

  const initialValues: HotelPageFormValues = {
    dateArrival: null,
    dateDeparture: null,
    numberAnimals: 1,
  };

  const validationSchema = Yup.object().shape({
    dateArrival: Yup.date().required(),
    dateDeparture: Yup.date().required(),
    numberAnimals: Yup.number().required(),
  });

  const disableUserDates = {};
  const disableUsersDates = [];

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (Object.keys(currentHotel.freeRooms).length !== 0) {
        const bookedDates = Object.keys(currentHotel.freeRooms);
        for (const date of bookedDates) {
          let totalAnimals = 0;
          for (
            let i = 0;
            i < currentHotel.freeRooms[date].usersId.length;
            i++
          ) {
            if (auth.payload.id === currentHotel.freeRooms[date].usersId[i]) {
              totalAnimals += currentHotel.freeRooms[date].usersAnimalsCount[i];
            }
          }
          if (
            currentHotel.freeRooms[date].availableSeats -
              values.numberAnimals <=
            0
          ) {
            disableUsersDates.push(+date);
          }
          if (totalAnimals + values.numberAnimals >= maxAnimals) {
            disableUserDates[auth.payload.id] = [
              ...(currentHotel.disableUserDates[auth.payload.id] || []),
              +date,
            ];
          }
        }
      }

      const formattedDateArrival = Date.parse(formatDate(values.dateArrival));
      const formattedDateDeparture = Date.parse(
        formatDate(values.dateDeparture)
      );
      const userDates = [
        formattedDateArrival,
        formattedDateDeparture,
        +values.numberAnimals,
        auth.payload.id,
      ];
      const dateRangeDecomposition = [];
      for (
        let i = formattedDateArrival;
        i <= formattedDateDeparture;
        i += 24 * 60 * 60 * 1000
      ) {
        dateRangeDecomposition.push(i);
      }

      const vacantRooms = {};

      for (const date of dateRangeDecomposition) {
        vacantRooms[date] = {
          availableSeats:
            (currentHotel.freeRooms?.[date]?.availableSeats
              ? currentHotel.freeRooms[date].availableSeats
              : currentHotel.hotelRooms) - values.numberAnimals,
          usersId: [
            ...(currentHotel.freeRooms?.[date]?.usersId || []),
            auth.payload.id,
          ],
          usersAnimalsCount: [
            ...(currentHotel.freeRooms?.[date]?.usersAnimalsCount || []),
            +values.numberAnimals,
          ],
        };
      }

      if (disableUsersDates.length > 0) {
        onBooking({
          id: currentHotel.id,
          disableUsersDates: [
            ...currentHotel.disableUsersDates,
            disableUsersDates,
          ],
        });
      } else if (Object.keys(disableUserDates).length > 0) {
        onBooking({
          id: currentHotel.id,
          disableUserDates: {
            ...(currentHotel.disableUserDates || {}),
            ...disableUserDates,
          },
        });
      } else {
        onBooking({
          id: currentHotel.id,
          dates: [...currentHotel.dates, userDates],
          freeRooms: { ...currentHotel.freeRooms, ...vacantRooms },
        });
      }
    },
  });

  const disableBookingDates = (date) => {
    const formattedDate = Date.parse(formatDate(date));
    return (
      currentHotel?.disableUsersDates?.includes(formattedDate) ||
      (auth?.payload?.id &&
        currentHotel?.disableUserDates?.[`${auth.payload.id}`]?.includes(
          formattedDate
        ))
    );
  };

  const { handleSubmit, errors, values, handleChange, dirty } = formik;

  useEffect(() => {
    if (values?.dateArrival && values?.dateDeparture) {
      if (
        Date.parse(formatDate(values.dateArrival)) >=
        Date.parse(formatDate(values.dateDeparture))
      ) {
        values.dateDeparture = new Date(
          values.dateArrival.getTime() + 24 * 60 * 60 * 1000
        );
      }
    }
  }, [values.dateArrival, values.dateDeparture]);

  if (errors?.dateArrival) {
    errors.dateArrival = "Arrival date is required";
  }

  if (errors?.dateDeparture) {
    errors.dateDeparture = "Departure date is required";
  }

  if (errors?.numberAnimals) {
    errors.numberAnimals = "Number of animals is required";
  }

  const hotelPhotos = (currentHotel?.photos || []).map((photo, index) => ({
    img: photo,
    title: `Photo ${index + 1}`,
    rows: index === 0 ? 2 : null,
    cols: index === 0 ? 2 : null,
  }));

  const cutHotelPhotos = hotelPhotos.slice(0, 5);

  const fullHotelPhotos = (currentHotel?.photos || []).map((photo, index) => ({
    img: photo,
    title: `Photo${index + 1}`,
    featured: index % 3 === 0 ? true : false,
  }));

  const updateOpenDialogStatus = (value) => {
    setOpenDialog(value);
  };

  return (
    <div style={hotelPageStyles.main}>
      {openDialog ? (
        <FullWindowGallery
          updateOpenDialogStatus={updateOpenDialogStatus}
          gallery={fullHotelPhotos}
        />
      ) : null}
      <div>
        <Typography variant="h3" gutterBottom component="div">
          {currentHotel.name}
        </Typography>
        <Typography
          sx={hotelPageStyles.blockInfo}
          variant="overline"
          display="block"
          gutterBottom
        >
          <div>
            <Link to="/reviews" style={hotelPageStyles.link}>
              {currentHotel.reviews.length} review(s)
            </Link>{" "}
            · {currentHotel.location}
          </div>
          <div style={hotelPageStyles.alignCenter}>
            <Link to="/share" style={hotelPageStyles.link}>
              <span style={hotelPageStyles.alignCenter}>
                <IosShareOutlinedIcon /> Share
              </span>
            </Link>
            <Link to="/save" style={hotelPageStyles.link}>
              <span style={hotelPageStyles.alignCenter}>
                <GradeOutlinedIcon /> Save
              </span>
            </Link>
          </div>
        </Typography>
      </div>
      <div>
        <ImageList sx={hotelPageStyles.gallery} cols={4}>
          {cutHotelPhotos.map((item, index) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.img, 50, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
              {index === 4 ? (
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    width: "50%",
                    fontSize: "10px",
                    position: "absolute",
                    bottom: 5,
                    left: 50,
                  }}
                  onClick={() => setOpenDialog(true)}
                >
                  Show more
                </Button>
              ) : null}
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div style={hotelPageStyles.descriptionBlock}>
        <div style={hotelPageStyles.descriptionLeftBlock}>
          <hr />
          <div>
            <Typography variant="h5" gutterBottom component="div">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              sunt id explicabo reiciendis nobis aliquam adipisci eos temporibus
              ipsa, quidem fuga cum sint earum blanditiis natus nulla nisi
              reprehenderit distinctio nihil libero perferendis sequi assumenda?
              Corrupti, laborum in voluptates, velit animi fugiat similique eum
              dolorum nobis cupiditate minus, a quas?
            </Typography>
          </div>
          <hr />
          <div>
            <Typography variant="h5" gutterBottom component="div">
              Description:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {currentHotel.description}
            </Typography>
          </div>
        </div>
        <div style={hotelPageStyles.descriptionRightBlock}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={hotelPageStyles.blockInfo}
                >
                  <div>
                    {currentCurrency?.sign}
                    {currentCurrency?.name === "USD"
                      ? currentHotel.price
                      : currentHotel.price *
                        currencyExchangeList[currentCurrency.name].toFixed(1) *
                        (values?.numberAnimals || 1)}{" "}
                    <sup>
                      {currentCurrency?.sign}
                      {currentHotel.price}/day
                    </sup>
                  </div>
                  <div>
                    <Typography variant="overline" display="block" gutterBottom>
                      <Link to="/reviews" style={hotelPageStyles.link}>
                        {currentHotel.reviews.length} review(s)
                      </Link>
                    </Typography>
                  </div>
                </Typography>
                <div style={{ display: "flex", marginBottom: 10 }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    name="dateArrival"
                    id="dateArrival"
                  >
                    <DesktopDatePicker
                      label="Arrival"
                      inputFormat="dd/MM/yyyy"
                      value={values.dateArrival}
                      shouldDisableDate={disableBookingDates}
                      onChange={(value) => {
                        formik.setFieldValue("dateArrival", value);
                      }}
                      minDate={
                        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={hotelPageStyles.divider}
                  />
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    name="dateDeparture"
                    id="dateDeparture"
                  >
                    <DesktopDatePicker
                      label="Departure"
                      inputFormat="dd/MM/yyyy"
                      value={values.dateDeparture}
                      shouldDisableDate={disableBookingDates}
                      onChange={(value) => {
                        formik.setFieldValue("dateDeparture", value);
                      }}
                      minDate={
                        new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </div>
                <Box>
                  <CustomTextField
                    id="numberAnimals"
                    name="numberAnimals"
                    label="Number of animals"
                    value={values.numberAnimals}
                    onChange={handleChange}
                    type="number"
                    variant="standard"
                    color="secondary"
                    fullWidth
                    InputProps={{
                      inputProps: {
                        max: maxAnimals,
                        min: 1,
                      },
                    }}
                  />
                  {Object.keys(errors).length > 0
                    ? Object.values(errors).map((error, index) => (
                        <Alert severity="error" key={index}>
                          {error}
                        </Alert>
                      ))
                    : null}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  fullWidth
                  disabled={
                    !auth?.token || !dirty || Object.keys(errors).length > 0
                  }
                >
                  {auth?.token ? "Book" : "Login to book"}
                </Button>
              </CardActions>
            </Card>
          </form>
        </div>
      </div>
      <hr />
      <div>
        <Typography variant="h5" gutterBottom component="div">
          {currentHotel.reviews.length} review(s)
        </Typography>
        <div style={hotelPageStyles.reviews}>
          {currentHotel.reviews.map((review, index) => (
            <Card sx={hotelPageStyles.review} key={index}>
              <CardHeader
                avatar={
                  <Link to={`/users/${review.owner.id}`}>
                    <Avatar
                      alt={`${review.owner.firstName} ${review.owner.lastName}`}
                      src={`${review.owner.pictureUrl || noAvatar}`}
                      sx={{ width: 56, height: 56 }}
                    />
                  </Link>
                }
                title={`${review.owner.firstName} ${review.owner.lastName}`}
                subheader={`${stringMonth(
                  new Date(review.createdAt).getMonth()
                )} ${new Date(review.createdAt).getDate()}, ${new Date(
                  review.createdAt
                ).getFullYear()}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {review.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <hr />
      <div>
        <Card sx={hotelPageStyles.review}>
          <CardHeader
            avatar={
              <Link to={`/users/${currentHotel.owner.id}`}>
                <Avatar
                  alt={`${currentHotel.owner.firstName} ${currentHotel.owner.lastName}`}
                  src={`${currentHotel.owner.pictureUrl || noAvatar}`}
                  sx={{ width: 56, height: 56 }}
                />
              </Link>
            }
            title={`Onwer: ${currentHotel.owner.firstName} ${currentHotel.owner.lastName}`}
            subheader={`On Shaggy tail since ${stringMonth(
              new Date(currentHotel.owner.createdAt).getMonth()
            )} ${new Date(currentHotel.owner.createdAt).getFullYear()}`}
          />
        </Card>
      </div>
    </div>
  );
};

export const CHotelPage = connect(
  (state: RootState) => ({
    promise: state.promise,
    auth: state.auth,
    currencyList: state.currencyList,
  }),
  {
    onBooking: actionFullHotelUpdate,
  }
)(HotelPage);
