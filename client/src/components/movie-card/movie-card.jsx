// import React from "react";
// import PropTypes from "prop-types";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

// import { Link } from "react-router-dom";

// export class MovieCard extends React.Component {
//   render() {
//     const { movie, onClick } = this.props;

//     return (
//       <Card className="movie-card" style={{ width: "18rem" }}>
//         <Card.Img variant="top" src={movie.ImagePath} />
//         <Card.Body>
//           {/* <Card.Title>{movie.Title}</Card.Title> */}
//           <Card.Title onClick={() => onClick(movie)}>{movie.Title}</Card.Title>
//           <Card.Text>{movie.Description}</Card.Text>
//         </Card.Body>
//         <Card.Footer>
//           <Link to={`/movies/${movie._id}`}>
//             <Button variant="link">Open</Button>
//           </Link>
//         </Card.Footer>
//       </Card>
//     );
//   }
// }

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired
//   }).isRequired
// };

import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="movie-card" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Footer>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};
