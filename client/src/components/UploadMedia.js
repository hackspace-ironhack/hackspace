import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UploadMedia
  extends Component {
  state = {
    uploadedImg: ""
  }


  onUpload = event => {
    const files = event.target.files[0]
    const uploadData = new FormData()

    uploadData.append("uploadedImg", files)
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
    const { uploadedImg } = this.state;
    axios.post(`/api/uploadedImg/${this.props.user._id}`, this.state)
      .then(console.log("Image Changed"))
      .catch(err => console.log(err))
  };

  render() {
    console.log("State: ",this.state)
    console.log("Props: ",this.props)
    return (
      <div>
        <section>
          <h2>Add Photos to your Profile</h2>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
            {/* <input type="text" name="name" onChange={this.handleChange} /> */}
            <input type="file" name="uploadImage" id="uploadImage" placeholder="Upload Photo here"                         onChange={this.onUpload} />
            // if else?!
            <input type="submit" value="Submit" />
          </form>
        </section>
      </div>
    )
  };
};