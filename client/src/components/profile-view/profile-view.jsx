// import React from "react";

// import axios from "axios";

// import Button from "react-bootstrap/Button";

// import Card from "react-bootstrap/Card";

// import ListGroup from "react-bootstrap/ListGroup";

// import { Link } from "react-router-dom";

// export class ProfileView extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       Name: null,

//       Password: null,

//       Email: null,

//       Birthday: null,

//       userData: null,

//       Favoritemovies: []
//     };
//   }

//   componentDidMount() {
//     let accessToken = localStorage.getItem("token");

//     if (accessToken !== null) {
//       this.getUser(accessToken);
//     }
//   }

//   getUser(token) {
//     let Email = localStorage.getItem("user");

//     axios
//       .get(`https://terranovas.herokuapp.com/users/${Email}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })

//       .then(response => {
//         console.log(response);
//         this.setState({
//           userData: response.data,
//           Name: response.data.UserName,
//           Password: response.data.Password,
//           Email: response.data.Email,
//           Birthday: response.data.Birthday,
//           Favoritemovies: response.data.Favoritemovies
//         });
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   }

//   handleChange(e) {
//     this.setState({ [e.target.Email]: e.target.value });
//   }

//   render() {
//     const { Name, Email, Birthday, Favoritemovies } = this.state;

//     return (
//       <Card className="profile-view" style={{ width: "32rem" }}>
//         <Card.Body>
//           <Card.Title className="profile-title">My Profile</Card.Title>

//           <ListGroup>
//             <ListGroup.Item>Username: {Name}</ListGroup.Item>

//             <ListGroup.Item>Password:******* </ListGroup.Item>

//             <ListGroup.Item>Email: {Email}</ListGroup.Item>

//             <ListGroup.Item>Birthday: {Birthday}</ListGroup.Item>
//           </ListGroup>

//           <div>
//             <Link to={`/`}>
//               <Button>MOVIES</Button>
//             </Link>
//             <Link to={`/update/:Email`}>
//               <Button className="button-update" variant="outline-secondary">
//                 Update profile
//               </Button>
//             </Link>
//           </div>
//         </Card.Body>
//       </Card>
//     );
//   }
// }

import React from "react";
//Routing
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//Styling
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const mapStateToProps = state => {
  const { movies } = state;
  return { movies };
};

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      userInfo: null,
      favorites: [],
      movies: []
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  // getUser(token) {
  //   let username = localStorage.getItem("user");
  //   let Email = localStorage.getItem("user");
  //   axios
  //     .get(`https://terranovas.herokuapp.com/users/${Email}`, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     .then(response => {
  //       this.setState({
  //         userInfo: response.data,
  //         username: response.data.UserName,
  //         password: response.data.Password,
  //         email: response.data.Email,
  //         birthday: response.data.Birthday,
  //         favorites: response.data.Favoritemovies
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }

  getUser(token) {
    let Email = localStorage.getItem("user");

    axios
      .get(`https://terranovas.herokuapp.com/users/${Email}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      .then(response => {
        console.log(response);
        this.setState({
          userData: response.data,
          Name: response.data.UserName,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          Favoritemovies: response.data.Favoritemovies
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  deleteFavorite(event, favorite) {
    event.preventDefault();
    console.log(favorite);
    axios
      .delete(
        `https://terranovas.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/Favorites/${favorite}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then(response => {
        this.getUser(localStorage.getItem("token"));
      })
      .catch(event => {
        alert("Somethings not right");
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { username, email, birthday, favorites } = this.state;
    const { movies } = this.props;
    return (
      <div className="profile-view">
        <Container>
          {/* <Card bg="primary" text="white" style={{ width: "30rem" }}>
            <Card.Header>
              <h2>
                {"  "}
                {username}
              </h2>
            </Card.Header>
            <Card bg="light" text="primary">
              <Card.Body>
                <Card.Text>
                  <b>Email: {email}</b>
                </Card.Text>
                <Card.Text>
                  <b>Birthday: {birthday}</b>
                </Card.Text>
                <Card.Text>
                  <Link to={`/update/:Username`}>
                    <Button className="button-update" variant="link">
                      Update profile
                    </Button>
                  </Link>
                </Card.Text>
              </Card.Body>{" "}
            </Card>
          </Card> */}
          <Card className="profile-view" style={{ width: "32rem" }}>
            <Card.Body>
              <Card.Title className="profile-title">My Profile</Card.Title>

              <ListGroup>
                <ListGroup.Item>Username: {username}</ListGroup.Item>

                <ListGroup.Item>Password:******* </ListGroup.Item>

                <ListGroup.Item>Email: {email}</ListGroup.Item>

                <ListGroup.Item>Birthday: {birthday}</ListGroup.Item>
              </ListGroup>

              <div>
                <Link to={`/`}>
                  <Button>MOVIES</Button>
                </Link>
                <Link to={`/update/:Email`}>
                  <Button className="button-update" variant="outline-secondary">
                    Update profile
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Container>
        <br />
        <Container>
          <div className="favorite-movies">
            <span className="label">Favorite Movies: </span>

            <span className="Value">
              {favorites.map(favorite => {
                const movie = movies.find(movie => movie._id === favorite);

                if (movie) {
                  return (
                    <div className="favorites" key={favorite}>
                      <Link to={`/movies/${movie._id}`}>
                        <img
                          className="movie-poster"
                          style={{ width: "6rem" }}
                          src={movie.ImagePath}
                        />
                      </Link>
                      <div>
                        <Button
                          size="sm"
                          onClick={event =>
                            this.deleteFavorite(event, favorite)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                      <br />
                    </div>
                  );
                }
              })}
            </span>
          </div>
        </Container>

        <Container>
          <div>
            <Link to={`/`}>
              <Button variant="link">Back</Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProfileView);
