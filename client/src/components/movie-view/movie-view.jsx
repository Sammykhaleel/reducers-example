// import React from "react";
// import Button from "react-bootstrap/Button";
// import { BrowserRouter, Route, Link } from "react-router-dom";

// export class MovieView extends React.Component {
//   constructor() {
//     super();

//     this.state = {};
//   }

//   render() {
//     const { movie } = this.props;

//     if (!movie) return null;

//     return (
//       <div className="movie-view">
//         <img
//           className="movie-poster"
//           src={movie.ImagePath}
//           style={{ width: "13rem" }}
//         />
//         <div className="movie-title">
//           <span className="label">Title: </span>
//           <span className="value">{movie.Title}</span>
//         </div>
//         <div className="movie-description">
//           <span className="label">Description: </span>
//           <span className="value">{movie.Description}</span>
//         </div>
//         <div className="movie-genre">
//           <span className="label">Genre: </span>
//           <span className="value">{movie.Genre.Name}</span>
//         </div>
//         <div className="movie-director">
//           <span className="label">Director: </span>
//           <span className="value">{movie.Director.Name}</span>
//         </div>
//         <button onClick={this.props.goBack}>Go Back</button>
//         <Link to={`/directors/${movie.Director.Name}`}>
//           <Button variant="link">Director</Button>
//         </Link>

//         <Link to={`/genres/${movie.Genre.Name}`}>
//           <Button variant="link">Genre</Button>
//         </Link>
//       </div>
//     );
//   }
// }

import React from "react";
//routing data
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//styling
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
// import "./movie-view.scss";

function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;

  const movie = movies.find(m => m._id === movieId);

  function addFavorite(e) {
    e.preventDefault();
    console.log();
    axios
      .post(
        `https://terranovas.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/movies/${movie._id}`,
        {
          username: localStorage.getItem("user")
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        alert("Added movie to favorites");
      })
      .catch(e => {
        alert("There was an error adding movie to favorites");
      });
  }

  return (
    <div className="movie-view">
      <Container>
        <Card bg="primary" text="white" style={{ width: "62rem" }}>
          <Card.Header>
            <h2>{movie.Title}</h2>
          </Card.Header>
          <Card bg="light" text="primary">
            <Card.Body>
              <Card.Img style={{ width: "18rem" }} src={movie.ImagePath} />
              <Card.Text>{movie.Description}</Card.Text>
              <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
              <Card.Text>Director: {movie.Director.Name}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">Director</Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">Genre</Button>
              </Link>
              <Button
                className="favoriteButton"
                variant="link"
                onClick={e => addFavorite(e)}
              >
                Add to Favorites
              </Button>
            </Card.Footer>
          </Card>
        </Card>
      </Container>
    </div>
  );
}

export default connect(({ movies }) => ({ movies }))(MovieView);
