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
    return {};
  }
  return state;
}

export function currencyReducer(state = {}, { type, currency, exchangeList }) {
  if (type === "CURRENCY_LIST") {
    if (Object.keys(currency).length > 0) {
      return {
        ...state,
        currency,
      };
    } else return state;
  }
  if (type === "EXCHANGE_LIST") {
    if (Object.keys(exchangeList).length > 0) {
      return {
        ...state,
        exchangeList,
      };
    } else return state;
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

export function headerReducer(state, { type }) {
  if (!state) {
    state = {
      smallHeader: false,
      bigHeader: true,
      expandSmallHeader: false,
    };
  }
  if (type === "SMALL") {
    return {
      ...state,
      smallHeader: true,
      bigHeader: false,
      expandSmallHeader: false,
    };
  }
  if (type === "BIG") {
    return {
      ...state,
      smallHeader: false,
      bigHeader: true,
      expandSmallHeader: false,
    };
  }
  if (type === "EXPAND") {
    return {
      ...state,
      smallHeader: false,
      bigHeader: false,
      expandSmallHeader: true,
    };
  }
  return state;
}

export function routeReducer(state, { type, route, params }) {
  if (!state) {
    state = {
      route: "",
      params: "",
    };
  }
  if (type === "ROUTE") {
    return {
      ...state,
      route,
    };
  }
  if (type === "PARAMS") {
    return {
      ...state,
      params,
    };
  }
  return state;
}
