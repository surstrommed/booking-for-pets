import React from "react";
import "./../assets/scss/App.scss";
import { Router } from "../pages/Router";
import { HeaderBar } from "./Header/HeaderBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./../assets/theme";
import { setupStore } from "../store/store";
import { SnackbarProvider } from "notistack";

export const store = setupStore();

export const { getState } = store;

export const App = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <HeaderBar />
          <Router />
        </div>
      </ThemeProvider>
    </SnackbarProvider>
  );
};
