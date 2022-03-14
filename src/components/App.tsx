import React from "react";
import "./../assets/scss/App.scss";
import Main from "./../pages/Main";
import Navbar from "./Navbar";
import { createBrowserHistory } from "history";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  sessionStoredReducer,
  promiseReducer,
  authReducer,
} from "./../reducers/index";
import thunk from "redux-thunk";
import { BrowserRouter } from "./BrowserRouter";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  promise: promiseReducer,
  auth: sessionStoredReducer(authReducer, "auth"),
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const getState = store.getState;
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

export default function App() {
  return (
    <BrowserRouter history={history}>
      <div className="App">
        <Navbar />
        <Main />
      </div>
    </BrowserRouter>
  );
}
