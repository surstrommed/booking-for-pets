import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App, { store } from "./components/App";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={1}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
