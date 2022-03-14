import {
  actionPending,
  actionRejected,
  actionResolved,
  actionAuthLogin,
} from "./types";
import { actionLogin, actionRegister, actionUpdate } from "./index";
import { jwtCode } from "./../helpers/index";
import { history } from "./../components/App";

export const actionPromise = (name, promise) => async (dispatch) => {
  dispatch(actionPending(name));
  try {
    const data = await promise;
    dispatch(actionResolved(name, data));
    return data;
  } catch (error) {
    dispatch(actionRejected(name, error));
  }
};

export const actionFullLogin =
  (email: string, password: string) => async (dispatch) => {
    const loginUser = await dispatch(actionLogin(email, password));
    const token = jwtCode(loginUser?.user);
    sessionStorage.authToken = token;
    if (sessionStorage.authToken) {
      await dispatch(actionAuthLogin(token));
      history.go(0);
    }
  };

export const actionFullRegister =
  (email: string, login: string, password: string) => async (dispatch) => {
    const registerUser = await dispatch(actionRegister(email, login, password));
    if (registerUser.user) {
      await dispatch(actionFullLogin(email, password));
    }
  };

export const actionFullUpdate =
  (id: number, email: string, login: string, password: string) =>
  async (dispatch) => {
    const updateUser = await dispatch(actionUpdate(id, email, login, password));
    if (Object.keys(updateUser).length !== 0) {
      await dispatch(actionFullLogin(email, password));
    }
  };
