import React from "react";
import "./../assets/scss/App.scss";
import Main from "./../pages/Main";
import Navbar from "./Navbar";
import { createBrowserHistory } from "history";
import { BrowserRouter } from "./BrowserRouter";

export const history = createBrowserHistory();

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
