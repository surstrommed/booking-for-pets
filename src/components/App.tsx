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
import { actionGetHotels } from "./../actions/index";
import {
  actionFullGetCurrencyExchange,
  actionFullGetCurrencyList,
} from "../actions/thunks";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  promise: sessionStoredReducer(promiseReducer, "promise"),
  header: headerReducer,
  auth: sessionStoredReducer(authReducer, "auth"),
  currencyList: sessionStoredReducer(currencyReducer, "currencyList"),
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const getState = store.getState;

console.log(getState());

store.subscribe(() => console.log(getState()));

store.dispatch(actionGetHotels());

store.dispatch(actionFullGetCurrencyList());

store.dispatch(actionFullGetCurrencyExchange());

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
