import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from "react-bootstrap";

export default class UploadMedia
  extends Component {
  state = {
    name: "",
    uploadedMedia: ""
  }

  // componentDidMount = () => {
  //   this.getData();
  // };


  onUpload = event => {
    const files = event.target.files[0]
    const uploadData = new FormData()

    uploadData.append("uploadedMedia", files)
    axios.post("/add/media", uploadData).then(response => {
      const uploadedMedia = response.data.secure_url
      this.uploadMedia(uploadedMedia);
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("submit")
    const { name, uploadedMedia } = this.state;
    axios.post(`/api/uploadedMedia/${this.props.user._id}`, this.state)
      .then((response) => {
        // update the user and re-render the Profile
        console.log("Image Changed", response)
        this.props.setUser(response.data);
      })
      .catch(err => console.log(err))
  };

  uploadMedia = (uploadedMedia) => {
    axios.post(`/api/uploadedMedia/${this.props.user._id}`, {uploadedMedia})
        .then((response) => {
          // update the user and re-render the Profile
          console.log("Image Changed", response)
          this.props.loadUser();
        })
        .catch(err => console.log(err));
  }


  render() {
    console.log("State: ", this.state)
    console.log("Props: ", this.props)
    return (
      <div>
        <section>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
            {/* <input type="text" name="name" onChange={this.handleChange} /> */}
            <Button as="label" variant="warning" active size="sm" style={{marginBottom:0}} block>
              Add Media <input type="file" name="profilePicture" style={{display: 'none'}} id="profilePicture" onChange={this.onUpload} />
            </Button>
          </form>
        </section>
      </div>
    )
  };
};