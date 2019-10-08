import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import About from "./About";
import UploadImage from "./UploadImage";
import AddPost from "./AddPost";
import AddProject from "./AddProject";
import Likebutton from "./Likebutton";
import axios from "axios";
import ToDoList from "./ToDoList";
import {Button} from 'react-bootstrap';

export default class Profile extends Component {

    state = {
        profile: {}
    }

    userId = this.props.match.params.id;

    componentDidMount = () => {
        this.loadData();
    }

  loadData = () => {
      // only loads a different user if an id is passed in the url
      if (this.userId !== undefined) {
          console.log(this.userId);
          axios.get(`/api/user/${this.userId}`).then(response => this.setState({profile: response.data}));
      }
    }

    followUser = () => {
        axios.post('/api/user/friends', {friend: this.userId})
    }

  render = () => {
    // This choses between your own profile or someone elses.
    const user = this.userId !== undefined ? this.state.profile : this.props.user;
    // if showing your own profile, it uses data from the props
    return (
      <div>
        {user && (
          <div>
            <ul>
              <li>Name: {user.name}</li>
              <li>City: {user.city}</li>
              <li>Skills: {user.skills}</li>
              <li>Hobbies: {user.hobbies}</li>
            </ul>
              {this.props.user && user._id === this.props.user._id &&
                  <AddPost user={user} />
              }
              {this.props.user && user._id !== this.props.user._id &&
                <Button onClick={this.followUser}>Follow</Button>
              }

          </div>
        )}
      </div>
    );
  };
}
