import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import About from "./About";
// import UploadImage from "./UploadImage";
import AddPost from "./AddPost";
import AddProject from "./AddProject";
import Likebutton from "./Likebutton";
import axios from "axios";
import ToDoList from "./ToDoList";
import { Button, Card, Badge } from 'react-bootstrap';
import UploadProfilePic from './UploadProfilePic';

import placeHolder from '../images/profile-placeholder.jpeg';


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
    routeChange(){
       let path = `newPath`;
       this.props.history.push(path);

    }

    followUser = () => {
        axios.post('/api/user/friends', {friend: this.userId})
    }

  render = () => {
    console.log(this.props.user)
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
                          <li>Skills: {user.skills}</li>
                          <li>Interests: {user.hobbies}</li>
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Card>
              </div>
              
              <div className="profile-picture-card">
                <Card border="dark" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={user.profilePicture} />
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    
                    <Button onClick = {this.routeChange}>
                    variant="warning">Edit your profile</Button>
                  </Card.Body>
                </Card>
              </div>
              
            </div>
            <div className="profile-links">
              <Button variant="secondary">Projects</Button>
              <Button variant="secondary">To Do List</Button>
              <Button variant="secondary">Friends</Button>
            </div>
            <div className="profile-post">
            <Card border="warning">
              <Card.Header as="h5">PLACE HOLDER FOR POST</Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  {this.props.user && user._id === this.props.user._id &&
                  <AddPost user={user} />
              }
                </Card.Text>
                <Button variant="warning">Publish</Button>
              </Card.Body>
            </Card>
            
            <Card border="light">
              <Card.Header>Posted by {user.name} on 01/01/01.</Card.Header>
              <Card.Body>
                <Card.Title>PLACE HOLDER FOR POSTs</Card.Title>
                <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus mauris in mauris auctor tempus. Pellentesque sit amet mollis turpis. Quisque dignissim urna id nulla rhoncus, vel sodales tellus ornare. Morbi nisi ex, tempor nec risus tincidunt, vehicula hendrerit metus. 
                        
                </Card.Text>
              </Card.Body>
              </Card>
              <Card border="light">
              <Card.Header>Posted by {user.name} on 01/01/01.</Card.Header>
              <Card.Body>
                <Card.Title>PLACE HOLDER FOR POSTs</Card.Title>
                <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In maximus mauris in mauris auctor tempus. Pellentesque sit amet mollis turpis. Quisque dignissim urna id nulla rhoncus, vel sodales tellus ornare. Morbi nisi ex, tempor nec risus tincidunt, vehicula hendrerit metus. 
                        
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
            
              {this.props.user && user._id !== this.props.user._id &&
                <Button variant="warning" onClick={this.followUser}>Follow</Button>
            }
                <UploadProfilePic/>

          </div>
        )}
      </div>
    );
  };
}