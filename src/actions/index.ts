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
import { defaultCurrencyId } from "./../helpers/index";

export const actionLogin = (email: string, password: string) => {
  console.log(email, password);
  return actionPromise("signin", userLogin({ email, password }));
};

export const actionRegister = (userData: UserModel) => {
  return actionPromise(
    "signup",
    userRegister({
      ...userData,
      currencyId: defaultCurrencyId,
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

export const actionUploadPhoto = (image: File) => {
  return actionPromise("uploadAvatar", uploadImage(image));
};

export const actionGetHotels = () => {
  return actionPromise("getHotels", getHotels());
};

export const actionHotelUpdate = (hotelData: HotelModel) => {
  const { payload: allHotels } = getState().promise.getHotels;
  const currentHotel = allHotels.find((hotel) => hotel.id === hotelData.id);

  return actionPromise(
    "hotelUpdate",
    getHotels({ ...currentHotel, ...hotelData }, "PUT")
  );
};

export const actionGetCurrency = () => {
  return actionPromise("getCurrency", getCurrency());
};

export const actionGetCurrencyExchange = () => {
  return actionPromise("exchangeRates", getExchangeRates());
};
