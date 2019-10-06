import React, { Component } from "react";

class LikeButton extends Component {
  state = {
    counter: 0,
    str:"Likes"
  };

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1,
      str: this.state.counter===0 ? "Like" : "Likes"
    });
  };

  render() {
      return (
      <button onClick={this.handleClick}>
        {this.state.counter} {this.state.str}
      </button>
    )

  }
}

export default LikeButton;