import { configureStore, combineReducers } from "@reduxjs/toolkit";
import headerReducer from "./reducers/HeaderSlice";
import { currencyAPI } from "./reducers/CurrencyService";
import { authAPI } from "./reducers/AuthService";
import { notificationAPI } from "./reducers/NotificationService";
import { hotelAPI } from "./reducers/HotelService";
import { usersAPI } from "./reducers/UserService";
import { GetState } from "../helpers/types";

export const loadSessionStorageState = () => {
  try {
    const serializedState = sessionStorage.getItem("appState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch {
    return undefined;
  }
};

export const saveSessionStorageState = async (state: GetState) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("appState", serializedState);
  } catch {
    return undefined;
  }
};

export const rootReducer = combineReducers({
  header: headerReducer,
  [currencyAPI.reducerPath]: currencyAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [notificationAPI.reducerPath]: notificationAPI.reducer,
  [hotelAPI.reducerPath]: hotelAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
    preloadedState: loadSessionStorageState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        currencyAPI.middleware,
        authAPI.middleware,
        notificationAPI.middleware,
        hotelAPI.middleware,
        usersAPI.middleware
      ),
  });
};
