// import React from "react";
// import ReactDOM from "react-dom";
// import axios from "axios";
// import { LoginView } from "../login-view/login-view";
// import { MovieCard } from "../movie-card/movie-card";
// import { MovieView } from "../movie-view/movie-view";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Container from "react-bootstrap/Container";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import DirectorView from "../director-view/director-view";
// import PropTypes from "prop-types";
// import MovieList from "../movie-list/movie-list";

// export class MainView extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       movies: [],
//       selectedMovie: null,
//       user: null
//     };
//   }

//   componentDidMount() {
//     let accessToken = localStorage.getItem("token");
//     if (accessToken !== null) {
//       this.setState({
//         user: localStorage.getItem("user")
//       });
//       this.getMovies(accessToken);
//     }
//   }

//   // onMovieClick {
//   //   this.setState({
//   //     selectedMovie: movie
//   //   });
//   // }

//   onLoggedIn(authData) {
//     console.log(authData);
//     this.setState({
//       user: authData.user.UserName
//     });

//     localStorage.setItem("token", authData.token);
//     localStorage.setItem("user", authData.user.UserName);
//     this.getMovies(authData.token);
//   }
//   getUser(token) {
//     axios
//       .get("https://dimi-app.herokuapp.com/users", {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(response => {
//         this.props.setUser(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
//   getMovies(token) {
//     axios
//       .get("https://dimi-app.herokuapp.com/movies", {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(response => {
//         // Assign the result to the state
//         this.setState({
//           movies: response.data
//         });
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }
//   goBack = () => {
//     this.setState({ selectedMovie: null });
//   };
//   render() {
//     const { movies, selectedMovie, user } = this.state;

//     // Before the movies have been loaded
//     if (!movies) return <div className="main-view" />;
//     // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
//     return (
//       <div className="main-view">
//         <Container style={{ width: "82rem" }}>
//           <Col>
//             <Row>
//               {/* {selectedMovie ? (
//                 <MovieView goBack={this.goBack} movie={selectedMovie} />
//               ) : (
//                 this.state.movies.map(m => (
//                   <MovieCard
//                     key={m._id}
//                     movie={m}
//                     onClick={m => this.onMovieClick(m)}
//                   />
//                 ))
//               )} */}
//             </Row>
//           </Col>
//         </Container>
//         <Router>
//           <Route
//             exact
//             path="/"
//             render={() => {
//               if (!user)
//                 return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
//               return <MovieList movies={movies} />;
//             }}
//           />
//           <Route
//             path="/movies/:movieId"
//             render={({ match }) => (
//               <MovieView
//                 movie={movies.find(m => m._id === match.params.movieId)}
//               />
//             )}
//           />
//           <Route
//             exact
//             path="/genres/:name"
//             render={({ match }) => {
//               if (!movies) return <div className="main-view" />;
//               return (
//                 <GenreView
//                   genre={
//                     movies.find(m => m.Genre.Name === match.params.name).Genre
//                   }
//                 />
//               );
//             }}
//           />
//           <Route
//             exact
//             path="/directors/:name"
//             render={({ match }) => {
//               if (!movies || movies.length === 0)
//                 return <div className="main-view" />;
//               return (
//                 <DirectorView
//                   director={
//                     movies.find(m => m.Director.Name === match.params.name)
//                       .Director
//                   }
//                   movies={movies}
//                 />
//               );
//             }}
//           />
//         </Router>
//       </div>
//     );
//   }
// }
// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string,
//     ImagePath: PropTypes.string,
//     Description: PropTypes.string,
//     Genre: PropTypes.exact({
//       _id: PropTypes.string,
//       Name: PropTypes.string,
//       Description: PropTypes.string
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string
//     })
//   }).isRequired
// };
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import DirectorView from "../director-view/director-view";
import PropTypes from "prop-types";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import About from "../Header/about";
import Contact from "../Header/contact";
import { RegistrationView } from "../registration-view/registration-view";
// import { LoginView } from "./components/login-view/login-view";
import { ProfileView } from "../profile-view/profile-view";
import MovieList from "../movie-list/movie-list";
import {
  Button,
  Form,
  FormControl,
  Navbar,
  Nav,
  NavDropdown
} from "react-bootstrap";

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
  getUser(token) {
    axios
      .get("https://dimi-app.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  getMovies(token) {
    axios
      .get("https://dimi-app.herokuapp.com/movies", {
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
    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    return (
      <div className="main-view">
        <Router basename="/client">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">
              MovieMania
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">
                  Contact
                </Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <Button size="sm" onClick={() => this.onLoggedOut()}>
                  <b>Log Out</b>
                </Button>
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>

          <br />

          <div className="main-view">
            <Container>
              <Route exact path="/users" component={ProfileView} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/register" render={() => <RegistrationView />} />
              <Route path="/login" render={() => <LoginView />} />
              <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    );
                  // return movies.map(m => <MovieCard key={m._id} movie={m} />);
                  return <MovieList />;
                }}
              />
              {/* <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    );
                  return <MovieList movies={movies} />;
                }}
              /> */}
            </Container>
            <Route
              path="/movies/:id"
              render={({ match }) => <MovieView movieId={match.params.id} />}
            />

            <Route
              exact
              path="/directors/:name"
              render={({ match }) => (
                <DirectorView directorName={match.params.name} />
              )}
            />
            <Route
              exact
              path="/genres/:name"
              render={({ match }) => (
                <GenreView genreName={match.params.name} />
              )}
            />
            <Route
              path="/users/:Username"
              render={({ match }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                return <ProfileView />;
              }}
            />
            <Route
              path="/update/:Username"
              render={() => (
                <UpdateProfileView
                  userInfo={userInfo}
                  user={user}
                  token={token}
                  updateUser={data => this.updateUser(data)}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}
MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      ImageUrl: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.exact({
        _id: PropTypes.string,
        Name: PropTypes.string,
        Description: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string
      })
    })
  )
};
