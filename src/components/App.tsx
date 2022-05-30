import React from "react";
import "./../assets/scss/App.scss";
import { Main } from "./../pages/Main";
import { HeaderBar } from "./Header/HeaderBar";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  sessionStoredReducer,
  promiseReducer,
  authReducer,
  headerReducer,
  currencyReducer,
} from "./../reducers/index";
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
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

const rootReducer = combineReducers({
  promise: sessionStoredReducer(promiseReducer, "promise"),
  header: headerReducer,
  auth: sessionStoredReducer(authReducer, "auth"),
  currencyList: sessionStoredReducer(currencyReducer, "currencyList"),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const { getState } = store;

// store.dispatch(actionGetNotifications());
// store.dispatch(actionGetUsers());
// store.dispatch(actionGetHotels());
// store.dispatch(actionFullGetCurrencyList());
// store.dispatch(actionFullGetCurrencyExchange());

export default function App() {
  return (
    <SnackbarProvider maxSnack={1}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <HeaderBar />
            <Main />
          </div>
        </ThemeProvider>
      </Provider>
    </SnackbarProvider>
  );
}
