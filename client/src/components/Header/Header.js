import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MainView } from "../main-view/main-view";

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  </header>
);

const Home = () => (
  <div>
    <h1>Home page</h1>
  </div>
);

export default Header;
