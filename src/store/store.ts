import { configureStore, combineReducers } from "@reduxjs/toolkit";
import headerReducer from "./reducers/HeaderSlice";
import { currencyAPI } from "./reducers/CurrencyService";
import { authAPI } from "./reducers/AuthService";

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
  [currencyAPI.reducerPath]: currencyAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
    preloadedState: loadSessionStorageState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(currencyAPI.middleware, authAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type GetState = AppStore["getState"];
export type AppDispatch = AppStore["dispatch"];
