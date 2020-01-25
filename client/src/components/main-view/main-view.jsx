import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.UserName
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.UserName);
    this.getMovies(authData.token);
  }
  getMovies(token) {
    axios
      .get("https://terranovas.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
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
  goBack = () => {
    this.setState({ selectedMovie: null });
  };
  render() {
    const { movies, selectedMovie, user } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    return (
      <div className="main-view">
        <Container style={{ width: "82rem" }}>
          <Col>
            <Row>
              {selectedMovie ? (
                <MovieView goBack={this.goBack} movie={selectedMovie} />
              ) : (
                this.state.movies.map(movie => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onClick={movie => this.onMovieClick(movie)}
                  />
                ))
              )}
            </Row>
          </Col>
        </Container>
        <Router>
          <Route
            path="/movies/:id"
            render={({ match }) => <MovieView movieId={match.params.id} />}
          />
          <Route
            exact
            path="/genres/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <GenreView
                  genre={
                    movies.find(m => m.Genre.Name === match.params.name).Genre
                  }
                />
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={
                    movies.find(m => m.Director.Name === match.params.name)
                      .Director
                  }
                />
              );
            }}
          />
        </Router>
      </div>
    );
  }
}
