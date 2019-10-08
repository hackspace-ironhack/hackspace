import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

export default class AddProject extends Component {
  state = {
    title: "",
    tools: "",
    description: "",
    link:""
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // http://localhost:5555/api/profile
    axios
      .post("/api/portfolio", {
        title: this.state.title,
        tools: this.state.tools,
        description: this.state.description,
        link: this.state.link,
      })
      .then(() => {
        this.setState({
          title: "",
          tools:"",
          description: "",
          link:""
        });
        this.props.getData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Form onSubmit = {this.handleSubmit}>
          <Form.Group> 
            <Form.Label htmlFor="title">Title </Form.Label>
              <Form.Control
              type="text"
              onChange={this.handleChange}
              id="post"
              name="post"
              value={this.state.post}
            />
            </Form.Group>

            <Form.Group> 
            <Form.Label htmlFor="tools">Tools</Form.Label>
              <Form.Control
              type="text"
              onChange={this.handleChange}
              id="post"
              name="post"
              value={this.state.post}
            />
            </Form.Group>

            <Form.Group> 
            <Form.Label htmlFor="description">Description </Form.Label>
              <Form.Control
              type="text"
              onChange={this.handleChange}
              id="post"
              name="post"
              value={this.state.post}
            />
            </Form.Group>

            <Form.Group> 
            <Form.Label htmlFor="link">Link </Form.Label>
              <Form.Control
              type="text"
              onChange={this.handleChange}
              id="post"
              name="post"
              value={this.state.post}
            />
            </Form.Group>
          <Button type="submit">Add to your Portfolio</Button>
        </Form>         
    );
  }
}
