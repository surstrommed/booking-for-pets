import React from "react";
import "./../assets/scss/App.scss";
import Main from "./../pages/Main";
import Navbar from "./Header/Header";
import { createBrowserHistory } from "history";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  sessionStoredReducer,
  promiseReducer,
  authReducer,
  routeReducer,
} from "./../reducers/index";
import thunk from "redux-thunk";
import { BrowserRouter } from "./Auxiliary/BrowserRouter";
import { ThemeProvider } from "@mui/material";
import { theme } from "./../assets/theme";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  promise: sessionStoredReducer(promiseReducer, "promise"),
  auth: sessionStoredReducer(authReducer, "auth"),
  route: sessionStoredReducer(routeReducer, "route"),
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
          <Navbar />
          <Main />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
