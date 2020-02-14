import React from "react";

import axios from "axios";

import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";

import ListGroup from "react-bootstrap/ListGroup";

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: null,

      Password: null,

      Email: null,

      Birthday: null,

      userData: null,

      Favoritemovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");

    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    let Email = localStorage.getItem("user");

    axios
      .get(`https://dimi-app.herokuapp.com/users/${Email}`, {
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

  handleChange(e) {
    this.setState({ [e.target.Email]: e.target.value });
  }

  render() {
    const { Name, Email, Birthday, Favoritemovies } = this.state;

    return (
      <Card className="profile-view" style={{ width: "32rem" }}>
        <Card.Body>
          <Card.Title className="profile-title">My Profile</Card.Title>

          <ListGroup>
            <ListGroup.Item>Username: {Name}</ListGroup.Item>

            <ListGroup.Item>Password:******* </ListGroup.Item>

            <ListGroup.Item>Email: {Email}</ListGroup.Item>

            <ListGroup.Item>Birthday: {Birthday}</ListGroup.Item>
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
    );
  }
}
