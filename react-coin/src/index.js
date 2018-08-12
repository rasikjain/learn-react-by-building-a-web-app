import ReactDom from "react-dom";
import Header from "./components/common/header";
import "./index.css";
import List from "./components/list/List";
import React, { Component } from "react";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Header />
        <List />
      </div>
    );
  }
}
ReactDom.render(<App />, document.getElementById("root"));
