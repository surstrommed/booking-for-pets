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
import { maxAnimals } from "../../helpers/index";

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
                {(values.dateArrival && values.dateDeparture
                  ? Math.trunc(
                      (values.dateDeparture.getTime() -
                        values.dateArrival.getTime()) /
                        (24 * 60 * 60 * 1000)
                    )
                  : 1) *
                  currentHotel?.price *
                  currencyExchangeList[currentCurrency.name].toFixed(1) *
                  (values?.numberAnimals || 1)}{" "}
                <sup>
                  {currentCurrency?.sign}
                  {currentHotel?.price *
                    currencyExchangeList[currentCurrency.name].toFixed(1)}
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
              disabled={
                !auth?.token ||
                disableBookingDates(values.dateArrival) ||
                disableBookingDates(values.dateDeparture)
              }
            >
              {auth?.token ? "Book" : "Login to book"}
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
