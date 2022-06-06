import React from "react";
import "./../assets/scss/App.scss";
import { Router } from "../pages/Router";
import { HeaderBar } from "./Header/HeaderBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./../assets/theme";
import { SnackbarProvider } from "notistack";
import { debounce } from "debounce";
import { saveSessionStorageState, setupStore } from "../store/store";
import { Provider } from "react-redux";

export const store = setupStore();

store.subscribe(
  debounce(() => {
    sessionStorage.removeItem("appState");
    saveSessionStorageState(() => store.getState());
  }, 1000)
);

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <SnackbarProvider maxSnack={1}>
            <HeaderBar />
            <Router />
          </SnackbarProvider>
        </div>
      </ThemeProvider>
    </Provider>
  );
};
