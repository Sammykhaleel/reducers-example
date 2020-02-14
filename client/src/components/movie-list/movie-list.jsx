import React from "react";

import { MovieCard } from "../movie-card/movie-card";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// function MoviesList(props) {
export class MovieList extends React.Component {
  render() {
    const { movies } = this.props;
    let filteredMovies = movies;

    if (!movies) return <div className="main-view" />;

    return (
      <div>
        {" "}
        <div className="filter-list">
          <Container style={{ width: "82rem" }}>
            <br />
            <Row>
              {filteredMovies.map(m => (
                <Col>
                  <MovieCard key={m._id} movie={m} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
