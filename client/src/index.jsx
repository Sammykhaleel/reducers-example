import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import moviesApp from "./reducers/reducers";
import { MainView } from "./components/main-view/main-view";
import "./index.scss";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import About from "./components/Header/about";
import Contact from "./components/Header/contact";
import { RegistrationView } from "./components/registration-view/registration-view";
import { LoginView } from "./components/login-view/login-view";
import { ProfileView } from "./components/profile-view/profile-view";
import {
  Button,
  Form,
  FormControl,
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(moviesApp);
class MyFlixApplication extends React.Component {
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
    window.open("/client", "_self");
  }

  render() {
    return (
      //
      <MainView />
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

// export default MyFlixApplication;
