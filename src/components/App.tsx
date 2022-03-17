import React, { useState, useEffect } from "react";
import "./../assets/scss/App.scss";
import Main from "./../pages/Main";
import HeaderBar from "./Header/HeaderBar";
import { createBrowserHistory } from "history";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  sessionStoredReducer,
  promiseReducer,
  authReducer,
} from "./../reducers/index";
import thunk from "redux-thunk";
import { BrowserRouter } from "./Auxiliary/BrowserRouter";
import { ThemeProvider } from "@mui/material";
import { theme } from "./../assets/theme";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  promise: promiseReducer,
  auth: sessionStoredReducer(authReducer, "auth"),
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const getState = store.getState;
store.subscribe(() => console.log(store.getState()));

export default function App() {
  return (
    <BrowserRouter history={history}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <HeaderBar />
          <Main />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
