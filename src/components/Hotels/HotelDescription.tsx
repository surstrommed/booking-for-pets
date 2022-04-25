import React from "react";
import { hotelPageStyles } from "./hotelsStyles";
import { DatePicker } from "./../Auxiliary/DatePicker";
import { CustomTextField } from "./../Auxiliary/CustomTextField";
import {
  Typography,
  Alert,
  Card,
  CardContent,
  Divider,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import { MAX_ANIMALS } from "../../helpers/consts";

const LeftBlockDescription = ({ currentHotel }) => {
  return (
    <div style={hotelPageStyles.descriptionLeftBlock}>
      <hr />
      <div>
        <Typography variant="h5" gutterBottom component="div">
          Description:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {currentHotel?.description}
        </Typography>
      </div>
    </div>
  );
};

const RightBlockDescription = ({ descriptionData }) => {
  const {
    currentHotel,
    formik,
    currentCurrency,
    currencyExchangeList,
    disableBookingDates,
    auth,
  } = descriptionData;

  const { handleSubmit, values, handleChange, errors, handleBlur } = formik;

  const disableBookingButton =
    currentHotel.owner === auth?.payload?.id ||
    !auth?.token ||
    disableBookingDates(values.dateArrival) ||
    disableBookingDates(values.dateDeparture);

  const textBookingButton =
    currentHotel.owner === auth?.payload?.id
      ? "You are the owner"
      : auth?.token
      ? "Book"
      : "Login to book";

  return (
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
                {currentCurrency?.sign || "$"}
                {Math.round(
                  (values.dateArrival && values.dateDeparture
                    ? Math.trunc(
                        (values.dateDeparture.getTime() -
                          values.dateArrival.getTime()) /
                          (24 * 60 * 60 * 1000)
                      )
                    : 1) *
                    currentHotel?.price *
                    currencyExchangeList[currentCurrency.name].toFixed(1) *
                    (values?.numberAnimals || 1)
                )}{" "}
                <sup>
                  {currentCurrency?.sign}
                  {Math.round(
                    currentHotel?.price *
                      currencyExchangeList[currentCurrency.name].toFixed(1)
                  )}
                  /day
                </sup>
              </div>
              <div>
                <Typography variant="overline" display="block" gutterBottom>
                  <ScrollLink to="reviews" style={hotelPageStyles.link}>
                    {currentHotel?.reviews?.length} review(s)
                  </ScrollLink>
                </Typography>
              </div>
            </Typography>
            <div style={hotelPageStyles.datePickerBlock}>
              <DatePicker
                type="arrival"
                formik={formik}
                disableFnc={disableBookingDates}
              />
              <Divider
                orientation="vertical"
                flexItem
                sx={hotelPageStyles.divider}
              />
              <DatePicker
                type="departure"
                formik={formik}
                disableFnc={disableBookingDates}
              />
            </div>
            <Box>
              <CustomTextField
                id="numberAnimals"
                name="numberAnimals"
                label="Number of animals"
                value={values.numberAnimals}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                variant="standard"
                color="secondary"
                fullWidth
                InputProps={{
                  inputProps: {
                    max: MAX_ANIMALS,
                    min: 1,
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                margin: `${
                  Object.keys(errors).length > 0 ? "5vh 0" : "5vh 0 0 0"
                }`,
              }}
            >
              <CustomTextField
                id="message"
                name="message"
                label="Additional message for booking (optional)"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                color="secondary"
                fullWidth
                multiline
              />
            </Box>
            {Object.keys(errors).length > 0 &&
              Object.values(errors).map((error, index) => (
                <Alert
                  severity="error"
                  key={index}
                  sx={hotelPageStyles.alertStyle}
                >
                  {error}
                </Alert>
              ))}
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              disabled={disableBookingButton}
            >
              {textBookingButton}
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export const HotelDescription = ({ hotelDescriptionData }) => {
  return (
    <div style={hotelPageStyles.descriptionBlock}>
      <LeftBlockDescription currentHotel={hotelDescriptionData.currentHotel} />
      <RightBlockDescription
        descriptionData={{
          currentHotel: hotelDescriptionData.currentHotel,
          formik: hotelDescriptionData.formik,
          currentCurrency: hotelDescriptionData.currentCurrency,
          currencyExchangeList: hotelDescriptionData.currencyExchangeList,
          disableBookingDates: hotelDescriptionData.disableBookingDates,
          auth: hotelDescriptionData.auth,
        }}
      />
    </div>
  );
};
