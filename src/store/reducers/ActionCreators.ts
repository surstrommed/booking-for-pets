import { jwtCode } from "../../helpers/functions";
import { getExchangeRates, userLogin } from "../../server/api/api";
import { AppDispatch } from "../store";
import { currencySlice } from "./CurrencySlice";
import axios from "axios";
import { ICurrency } from "../../server/api/api-models";
import { links } from "../../helpers/consts";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actionTestLogin =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      const user = userLogin({ email, password });

      console.log(user);

      //   if (loginUser) {
      //     const token = jwtCode({ ...loginUser.user, password });
      //     sessionStorage.authToken = token;

      //     if (sessionStorage.authToken) {
      //       dispatch(actionAuthLogin(token));
      //     }
      //   }
    } catch (error) {}
  };

// export const fetchCurrencyExchange = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(currencySlice.actions.currencyFetching());
//     const currencyExchangeList = await axios.get<ICurrency[]>(
//       links.currencyChange
//     );
//     dispatch(
//       currencySlice.actions.currencyFetchingSuccess(currencyExchangeList.data)
//     );
//   } catch (error) {
//     dispatch(currencySlice.actions.currencyFetchingError(error.message));
//   }
// };

export const fetchCurrencyExchange = createAsyncThunk("currency", async () => {
  const currencyExchangeList = await axios.get<ICurrency[]>(
    links.currencyChange
  );
  return currencyExchangeList.data;
});
