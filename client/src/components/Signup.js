import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../services/api";
import { Link, Redirect } from "react-router-dom";
const ReactRotatingText = require('react-rotating-text');

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
    if (this.props.user) {
      return <Redirect to="/profile"/>
    }
    // else <Redirect to="/"/>

    const styles = {
      signup: {
        display: 'flex',
        flexDirection: 'column',
      },
    }
    return (
      <>
        <div className="signup-container">
          <div style={styles.signup}>
            <span className="first-line">Connect with Tech Professionals from all over the world, share your projects & improve your coding skills. Join Hackspace now!</span>
            <div className="text-animation">
              <span>Together we <br></br>
                <ReactRotatingText items={['are stronger', 'create more', 'are unstoppable']} /> </span>
            </div>
            <div className="introduction">
              <span> Real human connection expanding creation experience on a whole other level </span>
            </div>
          </div>
          <div style={styles.signup}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  id="Username"
                  placeholder="Username"
                />
              </Form.Group>
              <Form.Group>
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
                <Form.Control
                  type="password"
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
              <Button variant="warning" type="submit" block>Signup</Button>
              <p className="text-center">
                Already have an account?
                <Button variant="warning" block type="submit" as={Link} to="/login">Login</Button>
              </p>
            </Form>



          </div>
        </div>
      </>
    );
  }
}
