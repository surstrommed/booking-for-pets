import React, { useEffect } from "react";
import "./../assets/scss/App.scss";
import { Main } from "./../pages/Main";
import { HeaderBar } from "./Header/HeaderBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./../assets/theme";
import {
  actionGetHotels,
  actionGetUsers,
  actionGetNotifications,
} from "./../actions/index";
import {
  actionFullGetCurrencyExchange,
  actionFullGetCurrencyList,
} from "../actions/thunks";
import { setupStore } from "../store/store";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { SnackbarProvider } from "notistack";
import { fetchCurrencyExchange } from "../store/reducers/ActionCreators";

export const store = setupStore();

export const { getState } = store;

// store.dispatch(actionGetNotifications());
// store.dispatch(actionGetUsers());
// store.dispatch(actionGetHotels());
// store.dispatch(actionFullGetCurrencyList());
// store.dispatch(actionFullGetCurrencyExchange());

export const App = () => {
  const { currency, isLoading, error } = useAppSelector(
    (state) => state.currency
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrencyExchange());
  }, []);

  return (
    <SnackbarProvider maxSnack={1}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <HeaderBar />
          <div style={{ marginTop: "30vh" }}>
            {isLoading && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {JSON.stringify(currency, null, 2)}
          </div>
          {/* <Main /> */}
        </div>
      </ThemeProvider>
    </SnackbarProvider>
  );
};
