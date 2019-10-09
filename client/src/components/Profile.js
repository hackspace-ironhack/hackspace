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
      <div className="profile-container">
        
        {user && (
          <div>
            {/* <div className="imagebox">
              <UploadProfilePic user={this.props.user}/>
            </div> */}
            <div className="profile-intro">
                {/* <Container>
                <Row>
                  <Col lg={4} md={{span:12, order: 2}} sm={{span:12, order: 2}} xl={{span:12, order: 2}}> */}
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
                  {/* </Col>
                  <Col lg={5} md={{span:12, order: 1}} sm={{span:12, order: 1}} xl={{span:12, order: 1}}> */}
              <div className="profile-picture-card">
                <Card border="dark" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={placeHolder} />
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    
                    <Button onClick={this.routeChange} variant="warning" active>Edit your profile</Button>

                    {this.props.user && user._id !== this.props.user._id &&
                <Button variant="warning" onClick={this.followUser} active>Follow</Button>
            }
                  </Card.Body>
                </Card>
                    </div>
                    {/* </Col>
                </Row>
                  </Container> */}
            </div>
            <div className="profile-content">
                <div className="profile-links">
                  <Button variant="secondary" active>Portfolio</Button>
                  <Button variant="secondary" active>Contacts</Button>
                </div>
                {/* calling the "post" component */}
                <div className="profile-post">
                  <Card border = "warning" className="post-card">
                    <Card.Body>
                      <Card.Text>
                  {this.props.user && user._id === this.props.user._id &&
                      <AddPost user={user} />
                  }
                    </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card>
                    <PostList posts={this.state.posts} user={this.props.user} />
                  </Card>
                  
              
                </div>
              </div>  
                {/* <UploadProfilePic/> */}

          </div>
        )}
      </div>
    );
  };
}