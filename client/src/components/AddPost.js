import React, {Component} from "react";
import axios from "axios";
import {Form, Button} from "react-bootstrap";

export default class AddPost extends Component {
   
    state ={
      post : "",
      posts: []
    };

    componentWillMount(){
      console.log("will mount", this.props.user)
      axios.get(`api/post/${this.props.user}`)
      .then(response=>{
        console.log(response);
        this.setState({
          posts:response
        })
      })
    }

    handleChange = event => {
      console.log(this.state);
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
          owner:this.props.user
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
      console.log("mounted coponent ", this.props)
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

        // {this.state.posts.map(element=>{
        //   return (<div> element.post</div>)
        // })}
      );
    }
}