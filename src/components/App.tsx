import React from "react";
import "./../assets/scss/App.scss";
import { CMain } from "./../pages/Main";
import HeaderBar from "./Header/HeaderBar";
import { createBrowserHistory } from "history";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  sessionStoredReducer,
  promiseReducer,
  authReducer,
  headerReducer,
  currencyReducer,
} from "./../reducers/index";
import thunk from "redux-thunk";
import { BrowserRouter } from "./Auxiliary/BrowserRouter";
import { ThemeProvider } from "@mui/material";
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

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  promise: sessionStoredReducer(promiseReducer, "promise"),
  header: headerReducer,
  auth: sessionStoredReducer(authReducer, "auth"),
  currencyList: sessionStoredReducer(currencyReducer, "currencyList"),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const getState = store.getState;

store.dispatch(actionGetNotifications() as never);
store.dispatch(actionGetUsers() as never);
store.dispatch(actionGetHotels() as never);
store.dispatch(actionFullGetCurrencyList() as never);
store.dispatch(actionFullGetCurrencyExchange() as never);

export default function App() {
  return (
    <BrowserRouter history={history}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <HeaderBar />
          <CMain />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
