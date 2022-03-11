import { jwtDecode } from "../../helpers";
import { history } from "./../components/App";

export function promiseReducer(
  state = {},
  { type, status, payload, error, name }
) {
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: { status, payload, error },
    };
  }
  return state;
}

export function authReducer(state, { type, token }) {
  if (!state) {
    if (localStorage.authToken) {
      type = "AUTH_LOGIN";
      token = localStorage.authToken;
    } else state = {};
  }
  if (type === "AUTH_LOGIN") {
    const payload = jwtDecode(token);
    if (!!token && typeof payload === "object") {
      localStorage.authToken = token;
      return {
        ...state,
        token,
        payload,
      };
    } else return state;
  }
  if (type === "AUTH_LOGOUT") {
    localStorage.removeItem("authToken");
    return {};
  }
  return state;
}
