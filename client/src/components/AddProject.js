import React, { Component } from "react";
import axios from "axios";
import { Form, Button, Card, ListGroup } from "react-bootstrap";
// import { Container, ListGroup, Card } from "react-bootstrap";

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

    // http://localhost:5555/api/portfolio
    axios
      .post(`/api/portfolio/${this.props.user._id}`, {
        title: this.state.title,
        tools: this.state.tools,
        description: this.state.description,
        link: this.state.link
      })
      .then(() => {
        this.setState({
          title: "",
          tools:"",
          description: "",
          link:""
        });
        this.props.getData();
        this.props.history.push("/portfolio");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Card>
      <Form onSubmit = {this.handleSubmit}>
            <ListGroup varient = "flush">
          <Form.Group> 
           
            <Form.Label htmlFor="title">Title </Form.Label>
              <Form.Control
              type="text"
              onChange={this.handleChange}
              id="title"
              name="title"
              value={this.state.title}
              />
              
            </Form.Group>
            <Form.Group> 
            <Form.Label htmlFor="tools">Tools</Form.Label>
              <Form.Control
              type="text"
              onChange={this.handleChange}
              id="tools"
              name="tools"
              value={this.state.tools}
            />
            </Form.Group>

            <Form.Group> 
            <Form.Label htmlFor="description">Description </Form.Label>
              <Form.Control
              type="text"
              onChange={this.handleChange}
              id="description"
              name="description"
              value={this.state.description}
            />
            </Form.Group>

            <Form.Group> 
            <Form.Label htmlFor="link">Link </Form.Label>
              <Form.Control
              type="text"
              onChange={this.handleChange}
              id="link"
              name="link"
              value={this.state.link}
            />
            </Form.Group>
            </ListGroup>
          <Button variant="warning" type="submit">Add to your Portfolio</Button>
        </Form>         
        </Card>
    );
  }
}
