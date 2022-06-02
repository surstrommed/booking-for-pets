import { getState } from "../components/App";
import {
  userLogin,
  userRegister,
  userUpdate,
  getHotels,
  getNotifications,
} from "../server/api/api";
import { actionPromise } from "./thunks";
import {
  UserModel,
  HotelModel,
  NotificationModel,
} from "../server/api/api-models";
import { DEFAULT_CURRENCY_ID } from "../helpers/consts";

export const actionLogin = (email: string, password: string) => {
  return actionPromise("signin", userLogin({ email, password }));
};

export const actionRegister = (userData: UserModel) => {
  return actionPromise(
    "signup",
    userRegister({
      ...userData,
      currencyId: DEFAULT_CURRENCY_ID,
      createdAt: Date.now(),
      pictureUrl: null,
      wishlists: [],
    })
  );
};

export const actionUserUpdate = (userData: UserModel) => {
  const { auth } = getState();
  const currentUser = auth?.payload;

  return actionPromise(
    "userUpdate",
    userUpdate({ ...currentUser, ...userData }, "PUT")
  );
};

export const actionGetHotels = () => {
  return actionPromise("getHotels", getHotels());
};

export const actionHotelUpdate = (hotelData: HotelModel) => {
  const { payload: allHotels } = getState().promise.getHotels;
  const currentHotel = allHotels.find(
    (hotel: HotelModel) => hotel.id === hotelData.id
  );

  return actionPromise(
    "hotelUpdate",
    getHotels({ ...currentHotel, ...hotelData }, "PUT")
  );
};

export const actionHotelDelete = (hotelId: string) => {
  const { payload: allHotels } = getState().promise.getHotels;
  const currentHotel = allHotels.find(
    (hotel: HotelModel) => hotel.id === hotelId
  );

  const deletedCurrentHotel = {
    id: hotelId,
    name: "",
    location: "",
    address: "",
    description: "",
    photos: [],
    hotelRooms: 0,
    freeRooms: {},
    userRequests: [],
    disableUserDates: {},
    disableUsersDates: [],
    price: 0,
    owner: 0,
    reviews: [],
  };

  return actionPromise(
    "hotelDelete",
    getHotels({ ...currentHotel, ...deletedCurrentHotel }, "PUT")
  );
};

export const actionHotelCreate = (hotelData: HotelModel) => {
  const { payload: allHotels } = getState().promise.getHotels;
  const currentHotel = allHotels.find(
    (hotel: HotelModel) => hotel.id === hotelData.id
  );

  return actionPromise(
    "hotelCreate",
    currentHotel
      ? getHotels({ ...currentHotel, ...hotelData }, "PUT")
      : getHotels(hotelData)
  );
};

export const actionGetUsers = () => {
  return actionPromise("getUsers", userUpdate());
};

export const actionGetNotifications = () => {
  return actionPromise("getNotifications", getNotifications());
};

export const actionSendNotification = (notificationData: NotificationModel) => {
  const { payload: allNotifications } = getState().promise.getNotifications;
  const currentNotification = allNotifications.find(
    (notification: NotificationModel) => notification.id === notificationData.id
  );

  return actionPromise(
    "sendNotification",
    currentNotification
      ? getNotifications({ ...currentNotification, ...notificationData }, "PUT")
      : getNotifications(notificationData)
  );
};
