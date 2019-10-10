import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { login } from "../services/api";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    message: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { username, password } = this.state;

    login(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: ""
        });
      } else {
        // successfully logged in
        // update the state for the parent component
        this.props.setUser(data);
        this.props.history.push("/profile");
      }
    });
  };

  render() {
    if (this.props.user) {
      return <Redirect to="/profile"/>
    }
    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username">Username: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              id="username"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
            />
          </Form.Group>
          {this.state.message && (
            <Alert variant="danger">{this.state.message}</Alert>
          )}
          <Button variant="warning" type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}
