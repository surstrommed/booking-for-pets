import React, { Component } from "react";
import { App } from "./App";
import { Navbar } from "./components/Navbar";

export interface MainProps {
  app: App;
}

export class Main extends Component<MainProps, {}> {
  constructor(props: MainProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <Navbar />;
  }
}
