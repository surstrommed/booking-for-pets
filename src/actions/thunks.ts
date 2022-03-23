import {
  actionPending,
  actionRejected,
  actionResolved,
  actionAuthLogin,
} from "./types";
import {
  actionLogin,
  actionRegister,
  actionUserUpdate,
  actionUploadPhoto,
  actionHotelUpdate,
} from "./index";
import { jwtCode, jwtDecode } from "../helpers/index";
import { getState, history } from "../components/App";
import { UserModel, HotelModel } from "../server/api/api-models";
import { checkError } from "./../helpers/index";

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
        history.go(0);
      }
    }
  };

export const actionFullRegister =
  (email: string, login: string, password: string) => async (dispatch) => {
    const registerUser = await dispatch(actionRegister(email, login, password));
    if (registerUser.user) {
      await dispatch(actionFullLogin(email, password));
    }
  };

export const actionFullUserUpdate =
  ({ id, email, login, password, newPassword, pictureUrl }: UserModel) =>
  async (dispatch) => {
    const findUser = await dispatch(actionLogin(email, password));
    if (findUser) {
      const updateUser = await dispatch(
        actionUserUpdate({
          id,
          email,
          login,
          password: newPassword ? newPassword : password,
          pictureUrl,
        })
      );
      if (Object.keys(updateUser).length !== 0) {
        await dispatch(actionFullLogin(email, newPassword || password));
      }
    }
  };

export const actionChangeAvatar = (image: File) => async (dispatch) => {
  const avatar: string = await dispatch(actionUploadPhoto(image));
  const { password } = jwtDecode(sessionStorage.authToken);
  const { id, email }: { id: number; email: string } = getState().auth.payload;
  if (avatar && id && email && password) {
    await dispatch(
      actionFullUserUpdate({ id, email, password, pictureUrl: avatar })
    );
  }
};

export const actionChangePassword =
  (password: string, newPassword: string) => async (dispatch) => {
    const { id, email }: { id: number; email: string } =
      getState().auth.payload;
    if (id && email) {
      await dispatch(
        actionFullUserUpdate({ id, email, password, newPassword })
      );
    }
  };

export const actionFullHotelUpdate =
  ({
    id,
    name,
    location,
    address,
    description,
    photos,
    hotelRooms,
    freeRooms,
    dates,
    price,
    owner,
    reviews,
  }: HotelModel) =>
  async (dispatch) => {
    const { payload: allHotels } = getState().promise.getHotels;
    if (allHotels && Object.keys(allHotels).length !== 0) {
      const updateHotel = await dispatch(
        actionHotelUpdate({
          id,
          name,
          location,
          address,
          description,
          photos,
          hotelRooms,
          freeRooms,
          dates,
          price,
          owner,
          reviews,
        })
      );
    }
  };
