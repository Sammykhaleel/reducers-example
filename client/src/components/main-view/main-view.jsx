import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  // One of the "hooks" available in a React Component
  // state = {
  //   movies: []
  // };
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null
    };
  }
  componentDidMount() {
    axios.get(`https://terranovas.herokuapp.com/movies`).then(res => {
      const movies = res.data;
      this.setState({ movies });
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;
    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView movie={selectedMovie} />
        ) : (
          this.state.movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onClick={movie => this.onMovieClick(movie)}
            />
          ))
        )}
      </div>
    );
  }
}
