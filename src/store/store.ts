import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { store } from "src/components/App";
import headerReducer from "./reducers/HeaderSlice";
import currencyReducer from "./reducers/CurrencySlice";

// const rootReducer = combineReducers({
//   promise: sessionStoredReducer(promiseReducer, "promise"),
//   header: headerReducer,
//   auth: sessionStoredReducer(authReducer, "auth"),
//   currencyList: sessionStoredReducer(currencyReducer, "currencyList"),
// });

export const loadSessionStorageState = () => {
  try {
    const serializedState = sessionStorage.getItem("appState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

export const saveSessionStorageState = async (state: AppStore) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("appState", serializedState);
  } catch {
    return undefined;
  }
};

const rootReducer = combineReducers({
  header: headerReducer,
  currency: currencyReducer,
});

export const setupStore = () => {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
    preloadedState: loadSessionStorageState(),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type GetState = AppStore["getState"];
export type AppDispatch = AppStore["dispatch"];
