import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from "react-bootstrap";

export default class UploadProfilePic extends Component {
  state = {
    name: "",
    profilePicture: ""
  }



  onUpload = event => {
    const files = event.target.files[0];
    const uploadData = new FormData();

    uploadData.append("profilePicture", files)
    axios.post("/add/image", uploadData).then(response => {
      const profilePicture = response.data.secure_url
      this.updateProfilePicture(profilePicture);
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    console.log(event.target)
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("submit")
    const { name, profilePicture } = this.state;
    axios.post(`/api/profilePicture/${this.props.user._id}`, this.state)
      .then((response) => {
        // update the user and re-render the Profile
        console.log("Image Changed", response)
        this.props.setUser(response.data);
      })
      .catch(err => console.log(err))
  };

  updateProfilePicture = (profilePicture) => {
    axios.post(`/api/profilePicture/${this.props.user._id}`, {profilePicture})
        .then((response) => {
          // update the user and re-render the Profile
          console.log("Image Changed", response)
          this.props.setUser(response.data);
        })
        .catch(err => console.log(err))
  }


  render() {
    console.log("State: ", this.state)
    console.log("Props: ", this.props)
    return (
      <div>
        <section>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
            {/* <input type="text" name="name" onChange={this.handleChange} /> */}
            {/*<input type="file" name="profilePicture" id="profilePicture" onChange={this.onUpload} />*/}
            <Button as="label" variant="warning" active size="sm" style={{marginBottom:0}}>
              Upload Profile Picture <input type="file" name="profilePicture" style={{display: 'none'}} id="profilePicture" onChange={this.onUpload} />
            </Button>
            {/*<Button variant="warning" type="submit" size="sm" active>Submit</Button>*/}
          </form>
        </section>
      </div>
    )
  };
};