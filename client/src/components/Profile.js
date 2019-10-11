import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import About from "./About";
import AddProject from "./AddProject";
import AddPost from "./AddPost";
import Likebutton from "./Likebutton";
import axios from "axios";
import Post from "./Post";
import PostList from "./PostList";
import { Button, Card, Image, Container, Row, Col } from 'react-bootstrap';
import UploadProfilePic from './UploadProfilePic';
import UploadMedia from './UploadMedia';

import placeHolder from '../images/profile-placeholder.jpeg';
import CardGroup from "react-bootstrap/CardGroup";



export default class Profile extends Component {

    state = {
      profile: {},
      posts: [],
      following:false,
    }

    componentDidMount = () => {
      this.loadProfile();
      this.loadPosts();
      this.loadRelationShip();
    }

  handleLike = (postId) => {
    axios.post(`/api/post/like/${postId}`).then(response => {
      this.loadPosts();
    }).catch(() => {/* do nothing */ })
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

    followUser = () => {
        const userId = this.props.match.params.id;
        axios.post('/api/user/friends', {friend: userId}).then(response => {
            if (response.data.success) {
                this.setState({following: true});
            }
        }).catch(() => { /* do nothing */});
    };

    unfollowUser = () => {
        const userId = this.props.match.params.id;
        axios.delete('/api/user/friends', {data: {friend: userId}}).then(response => {
            if (response.data.success) {
                this.setState({following: false});
            }
        }).catch(() => { /* do nothing */});
    };

    loadRelationShip = () => {
        const userId = this.props.match.params.id;
        if (userId !== this.props.user._id) {
            axios.get(`/api/user/friends/${userId}`).then(response => {
                const { from, to } = response.data;
                if (from === this.props.user._id && to === userId) {
                    this.setState({following: true});
                }
            }).catch(() => { /* do nothing */});
        }
    };

  render = () => {
    if (!this.props.user) return <Redirect to="/" />
    // Choses between your own profile or someone elses.
    const userId = this.props.match.params.id;

    const user = userId !== undefined ? this.state.profile : this.props.user;
    // if showing your own profile, it uses data from the props

    return (
      <div className="profile-container">

        {user && (
          <div>
            <div className="imagebox">
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
                <Card border="dark" style={{ width: '18rem' }} className="text-center">
                  <Card.Img variant="top" src={user.profilePicture || placeHolder} />
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    {this.props.user && user._id !== this.props.user._id &&
                        <Button variant="warning"
                                onClick={this.state.following ? this.unfollowUser : this.followUser }
                                active >
                                {this.state.following ? "Following" : "Follow"}
                        </Button>
                    }
                    {this.props.user && user._id === this.props.user._id &&
                        <UploadProfilePic user={this.props.user} setUser={this.props.setUser} />
                    }
                  </Card.Body>
                </Card>
                  <div>
                      {this.props.user && user._id === this.props.user._id &&
                        <Button variant="outline-secondary" as={Link} to="/about" block size='sm'>Edit your profile</Button>
                      }
                  </div>
              </div>

            </div>

            <div className="profile-content">
                <div className="profile-links">
                  <Button variant="secondary" active as={Link} to="/portfolio">Portfolio</Button>
                  <Button variant="secondary" active as={Link} to="/contacts">Contacts</Button>
                </div>
                {/* calling the "post" component */}
                {this.props.user && user._id === this.props.user._id &&
                <div className="profile-post">
                  <CardGroup>
                  <Card border="warning" className="post-card" style={{flexGrow: "6"}}>
                    <Card.Body>
                      <Card.Text>
                        <AddPost user={user} getData={this.loadPosts} />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                    <Card border="warning">
                        <Card.Body>
                            <Card.Text>
                        <UploadMedia user={this.props.user} loadUser={this.props.loadUser} setUser={this.setUser} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
                <PostList posts={this.state.posts} user={this.props.user} handleLike={this.handleLike} />


                </div>
              }
            </div>

          </div>
        )}
      </div>
    );
  };
}
