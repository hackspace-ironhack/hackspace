import React, {Component} from "react";
import axios from "axios";
import {Form, Button} from "react-bootstrap";

export default class AddPost extends Component {
   
    state ={
      post : "",
    };

    handleChange = event => {
      const value = event.target.value;
      const name = event.target.name;
        this.setState({
        [name]: value
      });
    };

    handleSubmit = event => {
      event.preventDefault();
      // http://localhost:5555/api/profile
      axios
        .post("/api/post", {
          post: this.state.post,
          // owner:this.props.user
        })
        .then(() => {
          this.setState({
            post: ""
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
            <Form.Label htmlFor="post">Write your post:</Form.Label>
              <Form.Control
              type="text"
              onChange={this.handleChange}
              id="post"
              name="post"
              value={this.state.post}
            />
            </Form.Group>
          <Button variant="warning" active type="submit">Submit</Button>
        </Form>
      );
    }
}