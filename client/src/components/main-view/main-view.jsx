import React from "react";

import axios from "axios";

export default class MainView extends React.Component {
  state = {
    movies: []
  };

  componentDidMount() {
    axios.get("https://terranovas.herokuapp.com/movies").then(res => {
      const movies = res.data;
      this.setState({ movies });
    });
  }

  render() {
    return (
      <ul>
        {this.state.movies.map(movie => (
          <li>{movie.Title}</li>
        ))}
      </ul>
    );
  }
}
