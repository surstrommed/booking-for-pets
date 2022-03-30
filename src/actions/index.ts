import { getState } from "../components/App";
import {
  userLogin,
  userRegister,
  userUpdate,
  uploadImage,
  getHotels,
  getCurrency,
  getExchangeRates,
} from "../server/api/api";
import { actionPromise } from "./thunks";
import { UserModel, HotelModel } from "../server/api/api-models";

export const actionLogin = (email: string, password: string) => {
  return actionPromise("signin", userLogin({ email, password }));
};

export const actionRegister = (
  email: string,
  login: string,
  password: string
) => {
  return actionPromise("signup", userRegister({ email, login, password }));
};

export const actionUserUpdate = ({
  id,
  email,
  login,
  firstName,
  lastName,
  password,
  pictureUrl,
  currency,
}: UserModel) => {
  const { auth } = getState();
  const user = auth?.payload;
  const newUserData = {
    id,
    email,
    login,
    password,
    pictureUrl,
    firstName,
    lastName,
    currency,
  };
  const arrayUserData = Object.entries(newUserData);
  const filteredUserDataArray = arrayUserData.filter(
    ([key, value]) => typeof value !== "undefined"
  );
  const filteredUserDataObj = {};
  for (let i = 0; i < filteredUserDataArray.length; i++) {
    filteredUserDataObj[filteredUserDataArray[i][0]] =
      filteredUserDataArray[i][1];
  }
  return actionPromise(
    "userUpdate",
    userUpdate({ ...user, ...filteredUserDataObj }, "PUT")
  );
};

export const actionUploadPhoto = (image: File) => {
  return actionPromise("uploadAvatar", uploadImage(image));
};

export const actionGetHotels = () => {
  return actionPromise("getHotels", getHotels());
};

export const actionHotelUpdate = ({
  id,
  name,
  location,
  address,
  description,
  photos,
  hotelRooms,
  freeRooms,
  dates,
  disableUserDates,
  disableUsersDates,
  price,
  owner,
  reviews,
}: HotelModel) => {
  const { payload: allHotels } = getState().promise.getHotels;
  const searchedHotel = allHotels.find((hotel) => hotel.id === id);
  const newHotelData = {
    id,
    name,
    location,
    address,
    description,
    photos,
    hotelRooms,
    freeRooms,
    dates,
    disableUserDates,
    disableUsersDates,
    price,
    owner,
    reviews,
  };
  const arrayHotelData = Object.entries(newHotelData);
  const filteredHotelDataArray = arrayHotelData?.filter(
    ([key, value]) => typeof value !== "undefined"
  );
  const filteredHotelDataObj = {};
  for (let i = 0; i < filteredHotelDataArray.length; i++) {
    filteredHotelDataObj[filteredHotelDataArray[i][0]] =
      filteredHotelDataArray[i][1];
  }
  return actionPromise(
    "hotelUpdate",
    getHotels({ ...searchedHotel, ...filteredHotelDataObj }, "PUT")
  );
};

export const actionGetCurrency = () => {
  return actionPromise("getCurrency", getCurrency());
};

export const actionGetCurrencyExchange = () => {
  return actionPromise("exchangeRates", getExchangeRates());
};
