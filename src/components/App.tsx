import React from "react";
import "./../assets/scss/App.scss";
import Main from "./../pages/Main";
import Navbar from "./Navbar";
import { CustomRouter } from "./CustomRouter";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export default function App() {
  return (
    <CustomRouter history={history}>
      <div className="App">
        <Navbar />
        <Main />
      </div>
    </CustomRouter>
  );
}
