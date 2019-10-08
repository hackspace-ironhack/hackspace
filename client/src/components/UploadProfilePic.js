import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

export default class UploadProfilePic
  extends Component {
  state = {
    name: "",
    file: {}
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, file } = this.state;
    axios.patch(`/api/profilepicture/${this.props.user._id}`, this.state)
      .then(console.log("Image Changed"))
      .catch(err => console.log(err))
  };

  render() {
    return (
      <div>
        <section>
          <h2>Upload your photo</h2>
          <form onSubmit={this.handleSubmit}>
            {/* <input type="text" name="name" onChange={this.handleChange} /> */}
            <input type="file" name="photo" />
            <input type="submit" value="Save" />
          </form>
        </section>
      </div>
    )
  };
};