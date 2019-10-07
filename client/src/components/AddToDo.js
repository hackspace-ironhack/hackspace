import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class ToDoForm extends Component {
  state = {
    title: "",
    description: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { title, description } = this.state;

    axios
      .post("/api/todos", {
        title,
        description,
        projectId: this.props.projectId
      })
      .then(() => {
        this.props.getData();
        this.props.hideForm();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h2>Add todo: </h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit">Add</Button>
        </Form>
      </div>
    );
  }
}
