import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import About from "./About";
import AddProject from "./AddProject";
import Likebutton from "./Likebutton";
import axios from "axios";
import Post from "./Post";
import PostList from "./PostList";
import { Button, Card } from 'react-bootstrap';
import UploadProfilePic from './UploadProfilePic';

import placeHolder from '../images/profile-placeholder.jpeg';

export default class Profile extends Component {

    state = {
      profile: {},
      posts: []
    }

    userId = this.props.match.params.id;

    componentDidMount = () => {
      this.loadProfile();
      this.loadPosts();
    }

  loadProfile = () => {
      // only loads a different user if an id is passed in the url
      if (this.userId !== undefined) {
          console.log(this.userId);
        axios.get(`/api/user/${this.userId}`)
          .then(response => this.setState({ profile: response.data }));
      }
  }
  
  loadPosts = () => {
      axios.get("/api/post")
      .then (response => {
        this.setState({
          posts: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
    
  }

    routeChange(){
       let path = `newPath`;
       this.props.history.push(path);

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
            {/* <ul>
              <li>Name: {user.name}</li>
              <li>City: {user.city}</li>
              <li>Skills: {user.skills}</li>
              <li>Hobbies: {user.hobbies}</li>
            </ul> */}
            <div className="imagebox">
              <UploadProfilePic user={this.props.user}/>
            </div>
            <div className="profile-intro">
                
                <div className="about-card">
                  <Card border="dark" style={{ width: '18rem' }}>
                    <Card.Header>About</Card.Header>
                    <Card.Body>
                      {/* <Card.Title>About:</Card.Title> */}
                      <Card.Text>
                        <ul>
                          <li>City: {user.city}</li>
                          <li>Technical Skills: {user.skills}</li>
                          <li>Interests: {user.hobbies}</li>

                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Card>
              </div>
              
              <div className="profile-picture-card">
                <Card border="dark" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={placeHolder} />
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    
                    <Button onClick = {this.routeChange} variant="warning" active>Edit your profile</Button>
                  </Card.Body>
                </Card>
              </div>
              
            </div>
            <div className="profile-links">
              <Button variant="secondary" active>Portfolio</Button>
              <Button variant="secondary" active>Scheduler</Button>
              <Button variant="secondary" active>Find Friends</Button>
            </div>
            {/* calling the "post" component */}
            <div className="profile-post">
              <Card border = "warning">
                <Card.Body>
                  <Card.Text>
                    <Card.Header> Posted by: {user.name} on DAte</Card.Header>
              {this.props.user && user._id === this.props.user._id &&
                  <Post getData={this.loadData} user={user} />
              }
                </Card.Text>
                </Card.Body>
              </Card>
              <PostList posts={this.state.posts} user={this.props.user}/>
          
               </div>
              {this.props.user && user._id !== this.props.user._id &&
                <Button variant="warning" onClick={this.followUser} active>Follow</Button>
            }
                <UploadProfilePic/>

          </div>
        )}
      </div>
    );
  };
}