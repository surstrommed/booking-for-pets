import { jwtCode } from "../../helpers/functions";
import { getExchangeRates, userLogin } from "../../server/api/api";
import { AppDispatch } from "../store";
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
      //     sessionStorage.token = token;

      //     if (sessionStorage.token) {
      //       dispatch(actionAuthLogin(token));
      //     }
      //   }
    } catch (error) {}
  };
