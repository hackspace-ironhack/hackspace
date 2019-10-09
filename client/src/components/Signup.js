import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../services/api";
import { Link } from "react-router-dom";

// const ReactRotatingText = require('react-rotating-text');

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    email: "",
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

    signup(username, password).then(data => {
      if (data.message) {
        this.setState({
          message: data.message,
          username: "",
          password: ""
        });
      } else {
        // successfully signed up
        // update the state for the parent component
        this.props.setUser(data);
        this.props.history.push("/about");
      }
    });
  };

  render() {
    const styles = {
      signup: {
        display: 'flex',
        flexDirection: 'column'
      },
    }
    return (
      <>
        <div className="signup-container">
          <div style={styles.signup}>
            <h1>Together we are stronger</h1>
          </div>
          <div style={styles.signup}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="username">Username: </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  id="username"
                  placeholder="Username"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="email">Email: </Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  id="email"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password: </Form.Label>
                <Form.Control
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  id="password"
                  placeholder="Password"
                />
              </Form.Group>
              {this.state.message && (
                <Alert variant="danger">{this.state.message}</Alert>
              )}
              <Button variant="secondary" type="submit">Signup</Button>
            </Form>
            Already have an account?
          <Button variant="secondary" type="submit">
              <Link to="/login">Login</Link></Button>
          </div>
          {/* <div class="social">
            <a href="/google"><i class="fab fa-google fa-3x"></i></a>
            <a href="/github"><i class="fab fa-github fa-3x"></i></a>
          </div> */}
        </div>
      </>
    );
  }
}
