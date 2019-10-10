import React from "react";
// import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

class PostList extends React.Component {

  handleClick = (event) => {
    this.props.handleLike(event.target.value);
  };

  render = () => {
    return (
      <div>
        {this.props.user.uploadedMedia.map(media => {
          return (
            <Image src={media} thumbnail style={{ width: '18rem' }}/>
          )
        })}
        {this.props.posts.reverse().map(item => {
          return (
            <Card border="light" style={{marginTop: "4vh"}}>
              <Card.Header>Posted by {item.owner.name} on {new Date(item.postedOn).toLocaleDateString()}.</Card.Header>
              <Card.Body>
                <Card.Text>
                  {item.post}
                </Card.Text>
                <Button variant="warning" active value={item._id} onClick={this.handleClick}>{item.likes.length} {item.likes.length === 1 ? "Like" : "Likes"}</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }

};

export default PostList;
