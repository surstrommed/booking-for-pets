import React from "react";
import { hotelPageStyles } from "./hotelsStyle";
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
import { maxAnimals } from "./bookingFunctions";
import useSnackBar from "./../Auxiliary/SnackBar";
import { formatStringDate } from "../../helpers";

const LeftBlockDescription = ({ currentHotel }) => {
  return (
    <div style={hotelPageStyles.descriptionLeftBlock}>
      <hr />
      <div>
        <Typography variant="h5" gutterBottom component="div">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sunt id
          explicabo reiciendis nobis aliquam adipisci eos temporibus ipsa,
          quidem fuga cum sint earum blanditiis natus nulla nisi reprehenderit
          distinctio nihil libero perferendis sequi assumenda? Corrupti, laborum
          in voluptates, velit animi fugiat similique eum dolorum nobis
          cupiditate minus, a quas?
        </Typography>
      </div>
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

const RightBlockDescription = ({ rightBlockDescriptionProps }) => {
  const { handleSubmit, values, handleChange, errors } =
    rightBlockDescriptionProps.formik;
  const [, sendSnackbar] = useSnackBar();
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
                {rightBlockDescriptionProps.currentCurrency?.sign || "$"}
                {(values?.dateArrival && values?.dateDeparture
                  ? Math.trunc(
                      (values.dateDeparture.getTime() -
                        values.dateArrival.getTime()) /
                        (24 * 60 * 60 * 1000)
                    )
                  : 1) *
                  rightBlockDescriptionProps.currentHotel?.price *
                  rightBlockDescriptionProps.currencyExchangeList[
                    rightBlockDescriptionProps.currentCurrency.name
                  ].toFixed(1) *
                  (values?.numberAnimals || 1)}{" "}
                <sup>
                  {rightBlockDescriptionProps.currentCurrency?.sign}
                  {rightBlockDescriptionProps.currentHotel?.price *
                    rightBlockDescriptionProps.currencyExchangeList[
                      rightBlockDescriptionProps.currentCurrency.name
                    ].toFixed(1)}
                  /day
                </sup>
              </div>
              <div>
                <Typography variant="overline" display="block" gutterBottom>
                  <ScrollLink to="reviews" style={hotelPageStyles.link}>
                    {rightBlockDescriptionProps.currentHotel?.reviews?.length}{" "}
                    review(s)
                  </ScrollLink>
                </Typography>
              </div>
            </Typography>
            <div style={hotelPageStyles.datePickerBlock}>
              <DatePicker
                type="arrival"
                formik={rightBlockDescriptionProps.formik}
                disableFnc={rightBlockDescriptionProps.disableBookingDates}
              />
              <Divider
                orientation="vertical"
                flexItem
                sx={hotelPageStyles.divider}
              />
              <DatePicker
                type="departure"
                formik={rightBlockDescriptionProps.formik}
                disableFnc={rightBlockDescriptionProps.disableBookingDates}
              />
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
              {Object.keys(errors).length > 0 &&
                Object.values(errors).map((error, index) => (
                  <Alert severity="error" key={index}>
                    {error}
                  </Alert>
                ))}
            </Box>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              fullWidth
              disabled={!rightBlockDescriptionProps.auth?.token}
              onClick={() =>
                values.dateArrival &&
                values.dateDeparture &&
                values.numberAnimals &&
                sendSnackbar({
                  msg: `You have booked ${
                    values.numberAnimals
                  } seats from ${formatStringDate(
                    Date.parse(values.dateArrival)
                  )} to ${formatStringDate(Date.parse(values.dateDeparture))}`,
                })
              }
            >
              {rightBlockDescriptionProps.auth?.token
                ? "Book"
                : "Login to book"}
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export const HotelDescription = ({ hotelDescriptionProps }) => {
  return (
    <div style={hotelPageStyles.descriptionBlock}>
      <LeftBlockDescription currentHotel={hotelDescriptionProps.currentHotel} />
      <RightBlockDescription
        rightBlockDescriptionProps={{
          currentHotel: hotelDescriptionProps.currentHotel,
          formik: hotelDescriptionProps.formik,
          currentCurrency: hotelDescriptionProps.currentCurrency,
          currencyExchangeList: hotelDescriptionProps.currencyExchangeList,
          disableBookingDates: hotelDescriptionProps.disableBookingDates,
          auth: hotelDescriptionProps.auth,
        }}
      />
    </div>
  );
};
