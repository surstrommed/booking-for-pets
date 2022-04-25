import { CurrencyModel } from "../server/api/api-models";
import {
  RESOLVED_PROMISE_STATUS,
  REJECTED_PROMISE_STATUS,
  PENDING_PROMISE_STATUS,
} from "../helpers/consts";

export const actionPending = (name: string) => ({
  type: "PROMISE",
  status: PENDING_PROMISE_STATUS,
  name,
});

export const actionResolved = (name: string, payload: object | string) => ({
  type: "PROMISE",
  status: RESOLVED_PROMISE_STATUS,
  name,
  payload,
});

export const actionRejected = (name: string, error: object | string) => ({
  type: "PROMISE",
  status: REJECTED_PROMISE_STATUS,
  name,
  error,
});

export const actionAuthLogin = (token: string) => ({
  type: "AUTH_LOGIN",
  token,
});

export const actionAuthLogout = () => ({ type: "AUTH_LOGOUT" });

export const actionSmallHeader = () => ({ type: "SMALL" });

export const actionBigHeader = () => ({ type: "BIG" });

export const actionExpandSmallHeader = () => ({ type: "EXPAND" });

export const actionGetExchangeList = (exchangeList: object) => ({
  type: "EXCHANGE_LIST",
  exchangeList,
});

export const actionGetCurrencyList = (currency: CurrencyModel) => ({
  type: "CURRENCY_LIST",
  currency,
});
