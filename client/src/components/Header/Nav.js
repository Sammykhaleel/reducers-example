import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { MainView } from "../main-view/main-view";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Go home</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
