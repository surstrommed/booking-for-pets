import React, { useState } from "react";
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
import { noAvatar, stringMonth } from "../../helpers/index";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomTextField } from "./../Auxiliary/CustomTextField";
import Alert from "@mui/material/Alert";
import { actionFullHotelUpdate } from "./../../actions/thunks";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

interface HotelPageFormValues {
  dateArrival: Date;
  dateDeparture: Date;
  numberAnimals: number;
}

const HotelPage = ({ promise, onBooking }) => {
  const { payload: currentHotel } = promise.hotelUpdate;
  const initialValues: HotelPageFormValues = {
    dateArrival: new Date(),
    dateDeparture: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    numberAnimals: 1,
  };
  const validationSchema = Yup.object().shape({
    dateArrival: Yup.date().required(),
    dateDeparture: Yup.date().required(),
    numberAnimals: Yup.number().required("Number of animals"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      if (values.numberAnimals > currentHotel.freeRooms) {
        setSubmitting(false);
      } else {
        const datesArrivalDeparture = [
          Date.parse(values.dateArrival),
          Date.parse(values.dateDeparture),
        ];
        const vacantRooms = currentHotel.freeRooms - values.numberAnimals;
        onBooking({
          id: currentHotel.id,
          dates: [...currentHotel.dates, datesArrivalDeparture],
          freeRooms: vacantRooms,
        });
      }
    },
  });

  const disableBookingDates = () => {
    return true;
  };

  const { handleSubmit, errors, values, handleChange } = formik;

  if (errors?.dateArrival) {
    errors.dateArrival = "Arrival date";
  }

  if (errors?.dateDeparture) {
    errors.dateDeparture = "Departure date";
  }

  const hotelPhotos = currentHotel.photos.map((photo, index) => ({
    img: photo,
    title: `Photo ${index + 1}`,
    rows: index === 0 ? 2 : null,
    cols: index === 0 ? 2 : null,
  }));

  return (
    <div style={hotelPageStyles.main}>
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
          <div>
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
          {hotelPhotos.map((item) => (
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
                  <div>{currentHotel.price} / day</div>
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
                      // shouldDisableDate={disableBookingDates}
                      onChange={(value) => {
                        formik.setFieldValue("dateArrival", value);
                      }}
                      minDate={new Date()}
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
                      onChange={(value) => {
                        formik.setFieldValue("dateDeparture", value);
                      }}
                      minDate={
                        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
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
                        max: 10,
                        min: 1,
                      },
                    }}
                  />
                  {Object.keys(errors).length > 1 ? (
                    <Alert severity="error">
                      {[...Object.values(errors)].join(", ")} are required
                    </Alert>
                  ) : Object.keys(errors).length === 1 ? (
                    <Alert severity="error">
                      {[...Object.values(errors)]} is required
                    </Alert>
                  ) : null}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  fullWidth
                >
                  Check availability
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
  }),
  {
    onBooking: actionFullHotelUpdate,
  }
)(HotelPage);
