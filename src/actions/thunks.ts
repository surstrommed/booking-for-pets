import {
  actionPending,
  actionRejected,
  actionResolved,
  actionAuthLogin,
  actionGetExchangeList,
  actionGetCurrencyList,
} from "./types";
import {
  actionLogin,
  actionRegister,
  actionUserUpdate,
  actionUploadPhoto,
  actionHotelUpdate,
  actionGetCurrencyExchange,
  actionGetCurrency,
  actionHotelCreate,
  actionHotelDelete,
  actionGetHotels,
  actionGetUsers,
  actionSendNotification,
  actionGetNotifications,
} from "./index";
import { getState } from "../components/App";
import {
  UserModel,
  HotelModel,
  NotificationModel,
  WishlistModel,
} from "../server/api/api-models";
import { checkError } from "../helpers/functions";
import { payloadTypes, DispatchType } from "../helpers/types";

export const actionPromise =
  (name: string, promise) => async (dispatch: DispatchType) => {
    dispatch(actionPending(name));
    try {
      const data = await promise;
      if (typeof data === "string" && checkError(data)) {
        throw new Error(data);
      } else {
        dispatch(actionResolved(name, data));
        return data;
      }
    } catch (error) {
      dispatch(actionRejected(name, error));
    }
  };

export const actionFullLogin =
  (email: string, password: string) => async (dispatch: DispatchType) => {
    const loginUser = await dispatch(actionLogin(email, password));

    if (loginUser) {
      const token = jwtCode({ ...loginUser.user, password });
      sessionStorage.token = token;

      if (sessionStorage.token) {
        dispatch(actionAuthLogin(token));
      }
    }
  };

export const actionFullRegister =
  (user: UserModel) => async (dispatch: DispatchType) => {
    const registerUser = await dispatch(actionRegister(user));
    if (registerUser.user) {
      await dispatch(actionFullLogin(user.email, user.password));
    }
  };

export const actionFullGetCurrencyExchange =
  () => async (dispatch: DispatchType) => {
    const currencyExchangeList = await dispatch(actionGetCurrencyExchange());
    if (Object.keys(currencyExchangeList).length > 0) {
      dispatch(actionGetExchangeList(currencyExchangeList));
    }
  };

export const actionFullGetCurrencyList =
  () => async (dispatch: DispatchType) => {
    const currencyList = await dispatch(actionGetCurrency());
    if (currencyList && Object.keys(currencyList).length > 0) {
      dispatch(actionGetCurrencyList(currencyList));
    }
  };

export const actionFullUserUpdate =
  (userData: UserModel, newPassword?: string) =>
  async (dispatch: DispatchType) => {
    const findUser = await dispatch(
      actionLogin(userData.email, userData.password)
    );

    if (findUser) {
      const updateUser = await dispatch(
        actionUserUpdate({
          ...userData,
          password: newPassword || userData?.password,
        })
      );

      if (Object.keys(updateUser).length !== 0) {
        await dispatch(
          actionFullLogin(userData.email, newPassword || userData?.password)
        );
      }
    }
  };

export const actionChangeAvatar =
  (image: File) => async (dispatch: DispatchType) => {
    const avatar: string = await dispatch(actionUploadPhoto(image));
    const { password } = jwtDecode(sessionStorage.token);
    const { id, email }: payloadTypes = getState().auth.payload;

    if (avatar && id && email && password) {
      await dispatch(
        actionFullUserUpdate({ id, email, password, pictureUrl: avatar })
      );
    }
  };

export const actionDeleteAvatar = () => async (dispatch: DispatchType) => {
  const { password } = jwtDecode(sessionStorage.token);
  const { id, email }: payloadTypes = getState().auth.payload;
  if (id && email && password) {
    await dispatch(
      actionFullUserUpdate({ id, email, password, pictureUrl: null })
    );
  }
};

export const actionChangePassword =
  (password: string, newPassword: string) => async (dispatch: DispatchType) => {
    const { id, email }: payloadTypes = getState().auth.payload;

    if (id && email) {
      await dispatch(
        actionFullUserUpdate({ id, email, password }, newPassword)
      );
    }
  };

export const actionChooseCurrency =
  (currencyId: number) => async (dispatch: DispatchType) => {
    const { password } = jwtDecode(sessionStorage.token);
    const { id, email }: payloadTypes = getState().auth.payload;

    if (id && email && password) {
      await dispatch(actionFullUserUpdate({ id, email, password, currencyId }));
    }
  };

export const actionFullHotelUpdate =
  (hotelData: HotelModel) => async (dispatch: DispatchType) => {
    const { payload: allHotels } = getState().promise.getHotels;

    if (allHotels && Object.keys(allHotels).length !== 0) {
      await dispatch(actionHotelUpdate(hotelData));
      await dispatch(actionGetHotels());
    }
  };

export const actionFullHotelDelete =
  (hotelId: string) => async (dispatch: DispatchType) => {
    await dispatch(actionHotelDelete(hotelId));
    await dispatch(actionGetHotels());
  };

export const actionFullHotelCreate =
  (hotelData: HotelModel) => async (dispatch: DispatchType) => {
    await dispatch(actionHotelCreate(hotelData));
    await dispatch(actionGetHotels());
  };

export const actionFullSendNotification =
  (notificationData: NotificationModel) => async (dispatch: DispatchType) => {
    await dispatch(actionSendNotification(notificationData));
    await dispatch(actionGetUsers());
    await dispatch(actionGetNotifications());
  };

export const actionUpdateWishlists =
  (wishlists: WishlistModel[]) => async (dispatch: DispatchType) => {
    const { password } = jwtDecode(sessionStorage.token);
    const { id, email }: { id: number; email: string } =
      getState().auth.payload;

    if (id && email && password) {
      await dispatch(actionFullUserUpdate({ id, email, password, wishlists }));
      await dispatch(actionGetHotels());
    }
  };
