import React from "react";
import ReactDom from "react-dom";
import Header from "./components/common/header";
import "./index.css";
import List from "./components/list/List";

const App = () => {
  return (
    <div>
      <Header />
      <List />
    </div>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
