import React, {Component} from "react";
import axios from "axios";
import {Form, Button} from "react-bootstrap";

export default class AddPost extends Component {
   
    state ={
      post : ""
    };

    handleChange = event => {
      const post = event.target.post;
        this.setState({
        [post]: post
      });
    };

    handleSubmit = event => {
      event.preventDefault();
      // http://localhost:5555/api/profile
      axios
        .post("/api/profile", {
          post: this.state.post
        })
        .then(() => {
          this.setState({
            post: ""
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
        <form onSubmit = {this.handleSubmit}>
            <label htmlFor="post">Your Post: </label>
              <input
              type="text"
              onChange={this.handleChange}
              id="post"
              name="post"
              value={this.state.post}
            />
          <Button type="submit">Add</Button>
        </form>
      );
    }
}