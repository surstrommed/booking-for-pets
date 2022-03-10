import React from "react";
import "./../assets/scss/App.scss";
import Main from "./../pages/Main";
import Navbar from "./Navbar";
import { createBrowserHistory } from "history";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { promiseReducer, authReducer } from "./../reducers/index";
import * as sagaActions from "../actions/sagas";
import { all } from "redux-saga/effects";
import { BrowserRouter } from "./BrowserRouter";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    promise: promiseReducer,
    auth: authReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

function* rootSaga() {
  yield all([
    sagaActions.promiseWatcher(),
    sagaActions.loginWatcher(),
    sagaActions.registerWatcher(),
  ]);
}

sagaMiddleware.run(rootSaga);

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
