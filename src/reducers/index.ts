import { jwtDecode } from "../helpers";
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
    if (sessionStorage.authToken) {
      type = "AUTH_LOGIN";
      token = sessionStorage.authToken;
    } else state = {};
  }
  if (type === "AUTH_LOGIN") {
    const payload = jwtDecode(token);
    if (!!token && typeof payload === "object") {
      sessionStorage.authToken = token;
      return {
        ...state,
        token,
        payload,
      };
    } else return state;
  }
  if (type === "AUTH_LOGOUT") {
    sessionStorage.removeItem("authToken");
    history.push("/");
    history.go(0);
    return {};
  }
  return state;
}

export const sessionStoredReducer =
  (reducer, sessionStorageName) => (state, action) => {
    if (!state && sessionStorage[sessionStorageName]) {
      return JSON.parse(sessionStorage[sessionStorageName]);
    } else {
      const newState = reducer(state, action);
      sessionStorage.setItem(sessionStorageName, JSON.stringify(newState));
      return newState;
    }
  };

export function routeReducer(state = {}, { type, match }) {
  if (type === "ROUTE") {
    return match;
  }
  return state;
}
