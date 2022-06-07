import React, { useState, useEffect } from "react";
import {
  createUniqueId,
  formatDate,
  formateUser,
  formatStringDate,
} from "../../helpers/functions";
import { sendSnackBarMessages, siteCurrencyList } from "../../helpers/consts";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { FullWindowGallery } from "./FullWindowGallery";
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
import { hotelPageStyles } from "./hotelsStyles";
import { HotelModel, CurrencyModel } from "../../server/api/api-models";
import {
  PENDING_REQUEST_MESSAGE,
  EMPTY_NOTIFICATION,
  UNREAD_NOTIFICATION,
} from "../../helpers/consts";
import { hotelAPI } from "../../store/reducers/HotelService";
import { currencyAPI } from "../../store/reducers/CurrencyService";
import { Preloader } from "../Auxiliary/Preloader";
import { usersAPI } from "../../store/reducers/UserService";
import { notificationAPI } from "../../store/reducers/NotificationService";

export const HotelPage = () => {
  const currentUser = formateUser();

  const { hotelId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);

  const {
    data: allHotels,
    error: hotelsError,
    isLoading: hotelsLoading,
  } = hotelAPI.useFetchAllHotelsQuery("");

  const {
    data: currencyList,
    error: currencyError,
    isLoading: currencyLoading,
  } = currencyAPI.useFetchAllCurrencyQuery("");

  const {
    data: usersList,
    error: usersError,
    isLoading: usersLoading,
  } = usersAPI.useFetchAllUsersQuery("");

  const [
    updateHotel,
    { isLoading: updateHotelLoading, error: updateHotelError },
  ] = hotelAPI.useUpdateHotelMutation();

  const [
    createNotification,
    { isLoading: createNotificationLoading, error: createNotificationError },
  ] = notificationAPI.useCreateNotificationMutation();

  const currentHotel = (allHotels || [])?.find(
    (hotel: HotelModel) => hotel.id === hotelId
  );

  const currencyExchangeList = currencyList?.rates;

  const currentCurrency = (siteCurrencyList || []).find(
    (currency: CurrencyModel) => currentUser?.currencyId === currency?.id
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

    onSubmit: (values, { resetForm }) => {
      const formattedDateArrival = Date.parse(formatDate(values.dateArrival));
      const formattedDateDeparture = Date.parse(
        formatDate(values.dateDeparture)
      );

      const userRequest = {
        arrivalDate: formattedDateArrival,
        departureDate: formattedDateDeparture,
        animalsNumber: +values.numberAnimals,
        usersId: currentUser?.id,
        message:
          values.message.trim().length === 0
            ? EMPTY_NOTIFICATION
            : values.message,
        status: PENDING_REQUEST_MESSAGE,
        id: createUniqueId(),
      };

      updateHotel({
        ...currentHotel,
        userRequests: [...currentHotel.userRequests, userRequest],
      });

      createNotification({
        id: createUniqueId(),
        text:
          values.message.trim().length === 0
            ? EMPTY_NOTIFICATION
            : values.message,
        status: UNREAD_NOTIFICATION,
        fromId: currentUser.id,
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
        typeof sendSnackbar === "function" &&
        !updateHotelError?.data
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

      resetForm();
    },
  });

  const disableBookingDates = (date: Date) => {
    const formattedDate = date && Date.parse(formatDate(date));
    return (
      currentHotel?.disableUsersDates?.includes(formattedDate) ||
      (currentUser?.id &&
        currentHotel?.disableUserDates?.[currentUser.id]?.includes(
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
    <Preloader
      isLoading={
        hotelsLoading ||
        currencyLoading ||
        usersLoading ||
        updateHotelLoading ||
        createNotificationLoading
      }
      error={
        hotelsError?.data ||
        currencyError?.data ||
        usersError?.data ||
        updateHotelError?.data ||
        createNotificationError?.data ||
        (!currentHotel && "error")
      }
    >
      <div style={hotelPageStyles.main}>
        {openDialog && (
          <FullWindowGallery
            updateOpenDialogStatus={updateOpenDialogStatus}
            gallery={galleryHotelPhotos}
          />
        )}
        <HotelHeader hotelData={currentHotel} />
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
            currentUser,
          }}
        />
        <hr />
        <HotelReviews currentHotel={currentHotel} />
        <hr />
        <HotelOwner currentHotel={currentHotel} users={usersList} />
      </div>
    </Preloader>
  );
};
