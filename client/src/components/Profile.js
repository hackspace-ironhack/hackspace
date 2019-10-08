import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import About from "./About";
import UploadImage from "./UploadImage";
import Post from "./Post";
import AddProject from "./AddProject";
import Likebutton from "./Likebutton";
import axios from "axios";
import ToDoList from "./ToDoList";

import { Button, Card, Badge } from 'react-bootstrap';

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
    // Choses between your own profile or someone elses.
    const user = this.userId !== undefined ? this.state.profile : this.props.user;
    // if showing your own profile, it uses data from the props
    return (
      <div>
        {user && (
          
          <div>
            <div className="about-card">
            <Card border = "dark" style = {{width:'18rem'}}>
              <Card.Body>
              <Card.Text>
               <ul>
                  <li>Name: {user.name}</li>
                  <li>City: {user.city}</li>
                  <li>Technical Skills: {user.skills}</li>
                  <li>Interests: {user.hobbies}</li>
               </ul>
               </Card.Text>
             </Card.Body>
            </Card>
            </div>
            <div className="profile-post">
              <Card border = "warning">
                <Card.Body>
                  <Card.Text>
              {this.props.user && user._id === this.props.user._id &&
                  <Post getData={this.loadData} user={user} />
              }
                </Card.Text>
                
                </Card.Body>
              </Card>
               </div>
              {this.props.user && user._id !== this.props.user._id &&
                <Button onClick={this.followUser}>Follow</Button>
              }

          </div>
        )}
      </div>
    );
  };
}
