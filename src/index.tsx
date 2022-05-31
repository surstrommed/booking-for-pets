import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { Provider } from "react-redux";
import { store, getState } from "./components/App";
import { debounce } from "debounce";
import { saveSessionStorageState, GetState } from "./store/store";

store.subscribe(
  debounce(() => {
    sessionStorage.removeItem("appState");
    saveSessionStorageState(getState<GetState>());
  }, 1000)
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
