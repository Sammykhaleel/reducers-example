import React from "react";
//Routing
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//Actions
import { setMovies, setUser } from "../../actions/actions";
//Views
import MoviesList from "../movies-list/movies-list";
import MovieView from "../movie-view/movie-view";
import DirectorView from "../director-view/director-view";
import GenreView from "../genre-view/genre-view";
import ProfileView from "../profile-view/profile-view";
// import { UpdateProfileView } from "../profile-view/update-profile";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import About from "../Header/about";
import Contact from "../Header/contact";
//Styling
import Container from "react-bootstrap/Container";
import {
  Button,
  Form,
  FormControl,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      register: false,
      userInfo: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://terranovas.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser(token) {
    axios
      .get("https://terranovas.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  updateUser(data) {
    this.setState({
      userInfo: data,
    });
    localStorage.setItem("user", data.Username);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      userInfo: authData.user,
    });
    this.props.setUser(authData.user);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/client", "_self");
  }

  register() {
    this.setState({ register: true });
  }

  goToLogin() {
    this.setState({ register: false });
  }

  render() {
    let { movies } = this.props;
    let { user, userInfo, token } = this.state;

    return (
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
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                return <MoviesList movies={movies} />;
              }}
            />
          </Container>
          {/* <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/login" render={() => <LoginView />} /> */}
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
            render={({ match }) => <GenreView genreName={match.params.name} />}
          />
          <Route
            path="/users/:Username"
            render={({ match }) => {
              if (!user)
                return (
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
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
                updateUser={(data) => this.updateUser(data)}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
