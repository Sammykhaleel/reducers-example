import React from "react";
import Header from "./components/Header/Header";
import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";
// import Main from "./components/Header/Nav";
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

class MyFlixApplication extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <MainView />
      </div>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

// export default MyFlixApplication;
