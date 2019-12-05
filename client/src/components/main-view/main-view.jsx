import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";

export class MainView extends React.Component {
  componentDidMount() {
    axios
      .get("<https://terranovas.herokuapp.com/movies>")
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;
    return (
      <div className="main-view">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id}>
            {movie.Title}
          </div>
        ))}
      </div>
    );
  }
}

// Find the root of our app
const container = document.getElementsByClassName("app-container")[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MainView), container);
