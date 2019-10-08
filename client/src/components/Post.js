import React, {Component} from "react";
import PostList from "./PostList";
import AddPost from "./AddPost";
import axios from "axios";

export default class Post extends Component {
  state = {
    posts: []
  };
  
  componentDidMount=() => {
    this.getData();
  };

  getData = () => {
    axios.get("/api/post")
    .then (response => {
      this.setState({
        posts:response.data
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

render(){
  console.log("posts > ", this.state)
  return (
    <div className="post-container">
      <h2>post</h2>

      <AddPost getData = {this.getData}/>
      <PostList posts = {this.state.posts}/>
    </div>
    );
  }
}