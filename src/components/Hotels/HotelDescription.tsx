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

const RightBlockDescription = ({
  currentHotel,
  formik,
  currentCurrency,
  currencyExchangeList,
  disableBookingDates,
  auth,
}) => {
  return (
    <div style={hotelPageStyles.descriptionRightBlock}>
      <form onSubmit={formik.handleSubmit}>
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
                {(formik.values?.dateArrival && formik.values?.dateDeparture
                  ? Math.trunc(
                      (formik.values.dateDeparture.getTime() -
                        formik.values.dateArrival.getTime()) /
                        (24 * 60 * 60 * 1000)
                    )
                  : 1) *
                  currentHotel?.price *
                  currencyExchangeList[currentCurrency.name].toFixed(1) *
                  (formik.values?.numberAnimals || 1)}{" "}
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
                value={formik.values.numberAnimals}
                onChange={formik.handleChange}
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
              {Object.keys(formik.errors).length > 0
                ? Object.values(formik.errors).map((error, index) => (
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
                !auth?.token ||
                !formik.dirty ||
                Object.keys(formik.errors).length > 0
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

export const HotelDescription = ({
  currentHotel,
  formik,
  currentCurrency,
  currencyExchangeList,
  disableBookingDates,
  auth,
}) => {
  return (
    <div style={hotelPageStyles.descriptionBlock}>
      <LeftBlockDescription currentHotel={currentHotel} />
      <RightBlockDescription
        currentHotel={currentHotel}
        formik={formik}
        currentCurrency={currentCurrency}
        currencyExchangeList={currencyExchangeList}
        disableBookingDates={disableBookingDates}
        auth={auth}
      />
    </div>
  );
};
