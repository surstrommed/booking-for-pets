import React, { useEffect } from "react";
import "./../assets/scss/App.scss";
import { Router } from "../pages/Router";
import { HeaderBar } from "./Header/HeaderBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./../assets/theme";
import {
  actionGetHotels,
  actionGetUsers,
  actionGetNotifications,
} from "./../actions/index";
import { setupStore } from "../store/store";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { SnackbarProvider } from "notistack";
import { currencyAPI } from "../store/reducers/CurrencyService";

export const store = setupStore();

export const { getState } = store;

// useEffect(() => {
//   const {
//     data: currency,
//     error,
//     isLoading,
//   } = currencyAPI.useFetchAllCurrencyQuery("");
// }, []);

// store.dispatch(actionGetNotifications());
// store.dispatch(actionGetUsers());
// store.dispatch(actionGetHotels());
// store.dispatch(actionFullGetCurrencyList());
// store.dispatch(actionFullGetCurrencyExchange());

export const App = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <HeaderBar />
          <Router />
        </div>
      </ThemeProvider>
    </SnackbarProvider>
  );
};
