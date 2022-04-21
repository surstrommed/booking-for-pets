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
} from "./index";
import { jwtCode, jwtDecode } from "../helpers/index";
import { getState, history } from "../components/App";
import { UserModel, HotelModel, Wishlists } from "../server/api/api-models";
import { checkError } from "./../helpers/index";

type payloadTypes = { id: number; email: string };

export const actionPromise = (name, promise) => async (dispatch) => {
  dispatch(actionPending(name));
  try {
    const data = await promise;
    if (checkError(data)) {
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
  (email: string, password: string) => async (dispatch) => {
    const loginUser = await dispatch(actionLogin(email, password));

    if (loginUser) {
      const token = jwtCode({ ...loginUser.user, password });
      sessionStorage.authToken = token;

      if (sessionStorage.authToken) {
        await dispatch(actionAuthLogin(token));
        (history.location.pathname.includes("signin") ||
          history.location.pathname.includes("signup")) &&
          history.push("/");
      }
      history.go(0);
    }
  };

export const actionFullRegister = (user) => async (dispatch) => {
  const registerUser = await dispatch(actionRegister(user));
  if (registerUser.user) {
    await dispatch(actionFullLogin(user.email, user.password));
  }
};

export const actionFullGetCurrencyExchange = () => async (dispatch) => {
  const currencyExchangeList = await dispatch(actionGetCurrencyExchange());
  if (Object.keys(currencyExchangeList).length > 0) {
    await dispatch(actionGetExchangeList(currencyExchangeList));
  }
};

export const actionFullGetCurrencyList = () => async (dispatch) => {
  const currencyList = await dispatch(actionGetCurrency());
  if (Object.keys(currencyList).length > 0) {
    await dispatch(actionGetCurrencyList(currencyList));
  }
};

export const actionFullUserUpdate =
  (userData: UserModel) => async (dispatch) => {
    const findUser = await dispatch(
      actionLogin(userData.email, userData.password)
    );

    if (findUser) {
      const updateUser = await dispatch(
        actionUserUpdate({
          ...userData,
          password: userData?.newPassword || userData?.password,
        })
      );

      if (Object.keys(updateUser).length !== 0) {
        await dispatch(
          actionFullLogin(
            userData.email,
            userData?.newPassword || userData?.password
          )
        );
      }
    }
  };

export const actionChangeAvatar = (image: File) => async (dispatch) => {
  const avatar: string = await dispatch(actionUploadPhoto(image));
  const { password } = jwtDecode(sessionStorage.authToken);
  const { id, email }: payloadTypes = getState().auth.payload;

  if (avatar && id && email && password) {
    await dispatch(
      actionFullUserUpdate({ id, email, password, pictureUrl: avatar })
    );
  }
};

export const actionDeleteAvatar = () => async (dispatch) => {
  const { password } = jwtDecode(sessionStorage.authToken);
  const { id, email }: payloadTypes = getState().auth.payload;
  if (id && email && password) {
    await dispatch(
      actionFullUserUpdate({ id, email, password, pictureUrl: null })
    );
  }
};

export const actionChangePassword =
  (password: string, newPassword: string) => async (dispatch) => {
    const { id, email }: payloadTypes = getState().auth.payload;

    if (id && email) {
      await dispatch(
        actionFullUserUpdate({ id, email, password, newPassword })
      );
    }
  };

export const actionChooseCurrency =
  (currencyId: number) => async (dispatch) => {
    const { password } = jwtDecode(sessionStorage.authToken);
    const { id, email }: payloadTypes = getState().auth.payload;

    if (id && email && password) {
      await dispatch(actionFullUserUpdate({ id, email, password, currencyId }));
    }
  };

export const actionFullHotelUpdate =
  (hotelData: HotelModel) => async (dispatch) => {
    const { payload: allHotels } = getState().promise.getHotels;

    if (allHotels && Object.keys(allHotels).length !== 0) {
      await dispatch(actionHotelUpdate(hotelData));
    }
  };

export const actionUpdateWishlists =
  (wishlists: Wishlists[]) => async (dispatch) => {
    const { password } = jwtDecode(sessionStorage.authToken);
    const { id, email }: { id: number; email: string } =
      getState().auth.payload;

    if (id && email && password) {
      await dispatch(actionFullUserUpdate({ id, email, password, wishlists }));
    }
  };
