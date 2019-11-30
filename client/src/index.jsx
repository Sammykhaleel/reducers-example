import axios from "axios";

class MyFlixApplication extends React.Component {
  constructor() {
    super();
    this.state = {};
    // code executed right when the component is created in the memory
  }

  render() {
    return <div className="main-view"></div>;
  }

  componentDidMount() {
    // code executed right after the component is added to the DOM.
  }

  componentDidUpdate() {
    // code executed right after component's state or props are changed.
  }

  componentWillUnmount() {
    // code executed just before the moment the component gets removed from the DOM.
  }
}
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
