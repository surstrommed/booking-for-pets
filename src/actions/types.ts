export const actionPending = (name) => ({
  type: "PROMISE",
  status: "PENDING",
  name,
});

export const actionResolved = (name, payload) => ({
  type: "PROMISE",
  status: "RESOLVED",
  name,
  payload,
});

export const actionRejected = (name, error) => ({
  type: "PROMISE",
  status: "REJECTED",
  name,
  error,
});

export const actionAuthLogin = (token) => ({ type: "AUTH_LOGIN", token });

export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });

export const actionSmallHeader = () => ({ type: "SMALL" });

export const actionBigHeader = () => ({ type: "BIG" });

export const actionExpandSmallHeader = () => ({ type: "EXPAND" });

export const actionGetRoute = (route) => ({ type: "ROUTE", route });

export const actionGetParams = (params) => ({ type: "PARAMS", params });

export const actionGetExchangeList = (exchangeList) => ({
  type: "EXCHANGE_LIST",
  exchangeList,
});

export const actionGetCurrencyList = (currency) => ({
  type: "CURRENCY_LIST",
  currency,
});
