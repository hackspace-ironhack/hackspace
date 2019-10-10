import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      this.setState({ uploadedMedia })
      console.log(this.state);
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


  render() {
    console.log("State: ", this.state)
    console.log("Props: ", this.props)
    return (
      <div>
        <section>
          <h2>Post </h2>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
            {/* <input type="text" name="name" onChange={this.handleChange} /> */}
            <input type="file" name="uploadedMedia" id="uploadedMedia" placeholder="Upload Photo here" onChange={this.onUpload} />

            {/* if else?! */}

            <input type="submit" value="Submit" />
          </form>
        </section>
      </div>
    )
  };
};