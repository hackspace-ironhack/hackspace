import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UploadProfilePic
  extends Component {
  state = {
    name: "",
    profilePicture: ""
  }


  onUpload = event => {
    const files = event.target.files[0]
    const uploadData = new FormData()

    uploadData.append("profilePicture", files)
    axios.post("/add/image", uploadData).then(response => {
      const profilePicture = response.data.secure_url
      this.setState({ profilePicture })
    })

  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, file, profilePicture } = this.state;
    axios.post(`/api/profilepicture/${this.props.user._id}`, this.state)
      .then(console.log("Image Changed"))
      .catch(err => console.log(err))
  };

  render() {
    console.log("State: ",this.state)
    console.log("Props: ",this.props)
    return (
      <div>
        <section>
          <h2>Upload your photo</h2>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
            {/* <input type="text" name="name" onChange={this.handleChange} /> */}
            <input type="file" name="profilePicture" id="profilePicture" onChange={this.onUpload} />
            <input type="submit" value="Save" />
          </form>
        </section>
      </div>
    )
  };
};