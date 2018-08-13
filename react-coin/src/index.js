import ReactDom from "react-dom";
import Header from "./components/common/header";
import "./index.css";
import List from "./components/list/List";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NotFound from "./components/notfound/notfound";
import Detail from "./components/detail/detail";

class App extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={List} exact />
            <Route path="/currency/:id" component={Detail} exact />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
ReactDom.render(<App />, document.getElementById("root"));
