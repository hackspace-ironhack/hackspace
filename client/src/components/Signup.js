import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../services/api";

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    email:"",
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
      signup:{
        display:'flex',
        flexDirection:'column'
      },
    }
    return (
      <>
      <div>
        
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
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email: </Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={this.state.email}
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
          <Button type="submit">Signup</Button>
        </Form>
        </div>
        </div>
      </>
    );
  }
}
