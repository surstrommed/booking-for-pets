import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState, history } from "../App";
import { useParams } from "react-router-dom";
import {
  formatDate,
  sendSnackBarMessages,
  formatStringDate,
} from "../../helpers/index";
import { useFormik } from "formik";
import { actionFullHotelUpdate } from "./../../actions/thunks";
import FullWindowGallery from "./FullWindowGallery";
import { HotelReviews } from "./HotelReviews";
import { HotelOnwer } from "./HotelOwner";
import { CHotelHeader } from "./HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelDescription } from "./HotelDescription";
import {
  clearPastFreeRooms,
  clearPastUserDates,
  clearPastUsersDates,
  completeFreeRooms,
  completeDisableUserDates,
  completeDisableUsersDates,
} from "./bookingFunctions";
import { HotelPageFormValues } from "../../server/api/api-models";
import { hotelPageVS } from "./../../helpers/validationSchemes";
import useSnackBar from "./../Auxiliary/SnackBar";
import { hotelPageStyles } from "./hotelsStyles";

const HotelPage = ({ promise, auth, currencyList, onBooking }) => {
  const { hotelId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const { payload: hotelsList } = promise.getHotels;

  const currentHotel = hotelsList?.find((hotel) => hotel.id === +hotelId);
  if (!currentHotel) {
    history.push("/");
  }

  const currencySiteList = currencyList?.currency;
  const currencyExchangeList = currencyList?.exchangeList;
  const currentCurrency = (currencySiteList || []).find(
    (currency) => auth?.payload?.currencyId === currency?.id
  ) || { name: "USD", sign: "$" };

  const initialValues: HotelPageFormValues = {
    dateArrival: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    dateDeparture: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
    numberAnimals: 1,
  };

  let disableUserDates = { ...(currentHotel?.disableUserDates || {}) };
  let disableUsersDates = [...(currentHotel?.disableUsersDates || [])];
  let freeRooms = { ...(currentHotel?.freeRooms || {}) };

  const [, sendSnackbar] = useSnackBar();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: hotelPageVS,
    validateOnChange: false,
    validateOnBlur: true,

    onSubmit: (values) => {
      const formattedDateArrival = Date.parse(formatDate(values.dateArrival));
      const formattedDateDeparture = Date.parse(
        formatDate(values.dateDeparture)
      );

      const userDates = {
        arrivalDate: formattedDateArrival,
        departureDate: formattedDateDeparture,
        animalsNumber: +values.numberAnimals,
        usersId: auth.payload.id,
      };

      freeRooms = clearPastFreeRooms(freeRooms);

      disableUserDates = clearPastUserDates(disableUserDates);

      disableUsersDates = clearPastUsersDates(disableUsersDates);

      freeRooms = completeFreeRooms({
        formattedDateArrival,
        formattedDateDeparture,
        freeRooms,
        currentHotel,
        values,
        auth,
      });

      disableUserDates = completeDisableUserDates({
        formattedDateArrival,
        formattedDateDeparture,
        currentHotel,
        auth,
        values,
        disableUserDates,
      });

      disableUsersDates = completeDisableUsersDates({
        currentHotel,
        values,
        disableUsersDates,
      });

      values.dateArrival &&
        values.dateDeparture &&
        values.numberAnimals &&
        sendSnackbar({
          msg: sendSnackBarMessages.hotelBookedMessage(
            sessionStorage.usersAnimalsCount,
            formatStringDate(Date.parse(values.dateArrival)),
            formatStringDate(Date.parse(values.dateDeparture))
          ),
        });

      onBooking({
        id: currentHotel?.id,
        userRequests: [...currentHotel.userRequests, userDates],
        freeRooms: { ...freeRooms },
        disableUserDates: {
          ...disableUserDates,
        },
        disableUsersDates: [...disableUsersDates],
      });

      history.go(0);
    },
  });

  const disableBookingDates = (date: Date) => {
    const formattedDate = Date.parse(formatDate(date));
    return (
      currentHotel?.disableUsersDates?.includes(formattedDate) ||
      (auth?.payload?.id &&
        currentHotel?.disableUserDates?.[auth.payload.id]?.includes(
          formattedDate
        ))
    );
  };

  const { errors, values, setFieldValue } = formik;

  useEffect(() => {
    if (values?.dateArrival && values?.dateDeparture) {
      if (
        Date.parse(formatDate(values.dateArrival)) >=
        Date.parse(formatDate(values.dateDeparture))
      ) {
        setFieldValue(
          "dateDeparture",
          new Date(values.dateArrival.getTime() + 24 * 60 * 60 * 1000)
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

  const galleryHotelPhotos = (currentHotel?.photos || []).map(
    (photo, index) => ({
      img: photo,
      title: `Photo${index + 1}`,
      featured: index % 3 === 0 ? true : false,
    })
  );

  const updateOpenDialogStatus = (value) => {
    setOpenDialog(value);
  };

  return (
    <div style={hotelPageStyles.main}>
      {openDialog && (
        <FullWindowGallery
          updateOpenDialogStatus={updateOpenDialogStatus}
          gallery={galleryHotelPhotos}
        />
      )}
      <CHotelHeader currentHotel={currentHotel} />
      <HotelGallery
        currentHotel={currentHotel}
        updateOpenDialogStatus={updateOpenDialogStatus}
      />
      <HotelDescription
        hotelDescriptionData={{
          currentHotel,
          formik,
          currentCurrency,
          currencyExchangeList,
          disableBookingDates,
          auth,
        }}
      />
      <hr />
      <HotelReviews currentHotel={currentHotel} />
      <hr />
      <HotelOnwer currentHotel={currentHotel} />
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
