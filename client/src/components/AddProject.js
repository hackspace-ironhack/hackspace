import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

export default class AddProject extends Component {
  state = {
    title: "",
    tools: "",
    link:""
  };

  handleChange = event => {
    const title = event.target.title;
    const tools = event.target.tools;
    const link = event.target.link;
      this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // http://localhost:5555/api/projects
    axios
      .post("/api/projects", {
        title = event.target.title,
        tools = event.target.tools,
        link = event.target.link
      })
      .then(() => {
        this.setState({
          title: "",
          tools: "",
          link:""
        });
        // updates the parent's component's state, which causes new props to be passed to the <ProjectList/> component
        this.props.getData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {/* all groups (label + input) are grouped in a Form.Group */}
        <Form.Group>
          {/* <label></label> */}
          <Form.Label htmlFor="title">Title: </Form.Label>
          {/* <input /> */}
          <Form.Control
            type="text"
            onChange={this.handleChange}
            id="title"
            name="title"
            value={this.state.title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="tools">Tools: </Form.Label>
          <Form.Control
            onChange={this.handleChange}
            type="text"
            name="tools"
            id="tools"
            value={this.state.description}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="links">Link: </Form.Label>
          <Form.Control
            onChange={this.handleChange}
            type="text"
            name="link"
            id="link"
            value={this.state.links}
          />
        </Form.Group>

        <Button type="submit">Add Your Project</Button>
      </Form>
    );
  }
}
