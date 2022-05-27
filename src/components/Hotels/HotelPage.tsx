import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  createUniqueId,
  formatDate,
  formatStringDate,
} from "../../helpers/functions";
import { sendSnackBarMessages } from "../../helpers/consts";
import { RootState } from "../../helpers/types";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  actionFullHotelUpdate as onBooking,
  actionFullSendNotification as onSendNotification,
} from "./../../actions/thunks";
import FullWindowGallery from "./FullWindowGallery";
import { HotelReviews } from "./HotelReviews";
import { HotelOwner } from "./HotelOwner";
import { HotelHeader } from "./HotelHeader";
import { HotelGallery } from "./HotelGallery";
import { HotelDescription } from "./HotelDescription";
import {
  HotelPageFormValues,
  UserRequestModel,
} from "../../server/api/api-models";
import { hotelPageVS } from "./../../helpers/validationSchemes";
import useSnackBar from "./../Auxiliary/SnackBar";
import Page404 from "../../pages/Page404";
import { hotelPageStyles } from "./hotelsStyles";
import { HotelModel, CurrencyModel } from "../../server/api/api-models";
import {
  PENDING_REQUEST_MESSAGE,
  EMPTY_NOTIFICATION,
  UNREAD_NOTIFICATION,
} from "../../helpers/consts";

export const HotelPage = () => {
  const promise = useSelector((state: RootState) => state.promise);
  const auth = useSelector((state: RootState) => state.auth);
  const currencyList = useSelector((state: RootState) => state.currencyList);

  const { hotelId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const { payload: hotelsList } = promise.getHotels;

  const currentHotel = hotelsList?.find(
    (hotel: HotelModel) => hotel.id === hotelId && hotel.owner !== 0
  );

  const currencySiteList = currencyList?.currency;
  const currencyExchangeList = currencyList?.exchangeList;
  const currentCurrency = (currencySiteList || []).find(
    (currency: CurrencyModel) => auth?.payload?.currencyId === currency?.id
  ) || { name: "USD", sign: "$" };

  const initialValues: HotelPageFormValues = {
    dateArrival: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    dateDeparture: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
    numberAnimals: 1,
    message: "",
  };

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

      const userRequest = {
        arrivalDate: formattedDateArrival,
        departureDate: formattedDateDeparture,
        animalsNumber: +values.numberAnimals,
        usersId: auth.payload.id,
        message:
          values.message.trim().length === 0
            ? EMPTY_NOTIFICATION
            : values.message,
        status: PENDING_REQUEST_MESSAGE,
        id: createUniqueId(),
      };

      onBooking({
        id: currentHotel?.id,
        userRequests: [...currentHotel.userRequests, userRequest],
      });

      onSendNotification({
        id: createUniqueId(),
        text:
          values.message.trim().length === 0
            ? EMPTY_NOTIFICATION
            : values.message,
        status: UNREAD_NOTIFICATION,
        fromId: auth.payload.id,
        toId: currentHotel.owner,
      });

      const alreadyBookedSeats = (
        currentHotel.userRequests.filter(
          (request: UserRequestModel) =>
            Number(request?.arrivalDate) === formattedDateArrival &&
            Number(request?.departureDate) === formattedDateDeparture
        ) || []
      ).reduce((accumulator: number, currentRequest: UserRequestModel) => {
        return accumulator + currentRequest?.animalsNumber;
      }, 0);

      if (
        values.dateArrival &&
        values.dateDeparture &&
        values.dateDeparture &&
        values.numberAnimals &&
        typeof sendSnackbar === "function"
      ) {
        sendSnackbar({
          msg: sendSnackBarMessages.hotelBookedMessage(
            alreadyBookedSeats + values.numberAnimals,
            formatStringDate(Date.parse(values.dateArrival.toString())),
            formatStringDate(Date.parse(values.dateDeparture.toString()))
          ),
          variant: "success",
        });
      }
    },
  });

  const disableBookingDates = (date: Date) => {
    const formattedDate = date && Date.parse(formatDate(date));
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

  if (values.message.length > 100) {
    errors.message = "Additional message cannot exceed 100 characters";
  } else {
    if (errors?.message) {
      delete errors.message;
    }
  }

  const galleryHotelPhotos = (currentHotel?.photos || []).map(
    (photo: string, index: number) => ({
      img: photo,
      title: `Photo${index + 1}`,
      featured: index % 3 === 0 ? true : false,
    })
  );

  const updateOpenDialogStatus = (value: boolean) => {
    setOpenDialog(value);
  };

  return (
    <>
      {currentHotel ? (
        <div style={hotelPageStyles.main}>
          {openDialog && (
            <FullWindowGallery
              updateOpenDialogStatus={updateOpenDialogStatus}
              gallery={galleryHotelPhotos}
            />
          )}
          <HotelHeader currentHotel={currentHotel} />
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
          <HotelOwner
            currentHotel={currentHotel}
            users={promise.getUsers.payload}
          />
        </div>
      ) : (
        <Page404 />
      )}
    </>
  );
};
