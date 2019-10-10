import React, { Component } from "react";
import { Redirect, Link} from "react-router-dom";
import About from "./About";
import AddProject from "./AddProject";
import AddPost from "./AddPost";
import Likebutton from "./Likebutton";
import axios from "axios";
import Post from "./Post";
import PostList from "./PostList";
import { Button, Card, Image, Container, Row, Col } from 'react-bootstrap';
import UploadProfilePic from './UploadProfilePic';

import placeHolder from '../images/profile-placeholder.jpeg';



export default class Profile extends Component {

    state = {
      profile: {},
      posts: []
    }

    componentDidMount = () => {
      this.loadProfile();
      this.loadPosts();
    }

    handleLike = (postId) => {
        axios.post(`/api/post/like/${postId}`).then(response => {
            this.loadPosts();
        }).catch(() => {/* do nothing */})
    }

  loadProfile = () => {
      // only loads a different user if an id is passed in the url
      const userId = this.props.match.params.id;
      if (userId !== undefined) {
        axios.get(`/api/user/${userId}`)
          .then(response => this.setState({ profile: response.data }));
      }
  }

  loadPosts = () => {
        const userId = this.props.match.params.id;
        let request;
        if (userId !== undefined) {
            request = axios.get(`/api/post/owner/${userId}`)
        } else {
            request = axios.get("/api/post")
        }
        request.then(response => {
            this.setState({
              posts: response.data
            });
        }).catch(err => {
            console.log(err);
        });
  }

    routeChange(){
       let path = `newPath`;
       this.props.history.push(path);

    }

    followUser = () => {
        const userId = this.props.match.params.id;
        axios.post('/api/user/friends', {friend: userId})
    }

  render = () => {
    console.log(this.props.user)
    // Choses between your own profile or someone elses.
    const userId = this.props.match.params.id;

    const user = userId !== undefined ? this.state.profile : this.props.user;
    // if showing your own profile, it uses data from the props
    return (
      <div className="profile-container">

        {user && (
          <div>
            <div className="imagebox">
              <UploadProfilePic user={this.props.user} loadProfile={this.loadProfile} />
            </div>
            <div className="profile-intro">
              <div className="about-card">


                  <Card border="dark" style={{ width: '60vw' }}>
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
                  <Card.Img variant="top" src={user.profilePicture || placeHolder} />
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    {this.props.user && user._id !== this.props.user._id &&
                        <Button variant="warning" onClick={this.followUser} active>Follow</Button>
                    }
                    {this.props.user && user._id === this.props.user._id &&
                        <Button variant="warning" active as={Link} to="/about">Edit your profile</Button>
                    }
                  </Card.Body>
                </Card>
                    </div>
            </div>
            <div className="profile-content">
                <div className="profile-links">
                  <Button variant="secondary" active>Portfolio</Button>
                  <Button variant="secondary" active>Contacts</Button>
                </div>
                {/* calling the "post" component */}
                {this.props.user && user._id === this.props.user._id &&
                <div className="profile-post">
                  <Card border = "warning" className="post-card">
                    <Card.Body>
                      <Card.Text>

                      <AddPost user={user} getData={this.loadPosts} />

                    </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card>
                  <PostList posts={this.state.posts} user={this.props.user} handleLike={this.handleLike} />
                  </Card>


                </div>
                }
              </div>
                {/* <UploadProfilePic/> */}

          </div>
        )}
      </div>
    );
  };
}