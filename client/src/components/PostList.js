import React from "react";
// import { Link } from "react-router-dom";
import {Card} from "react-bootstrap";
import {Button} from "react-bootstrap";

class PostList extends React.Component {

  handleClick = (event) => {
    this.props.handleLike(event.target.value);
  };

  render = () => {
    return (
        <div>
          {this.props.posts.reverse().map(item => {
          console.log("user",this.props)
            return (
                <Card border="light">
                  {/* <Card.Header>Posted by {item.name} on {new Date(item.postedOn).toLocaleDateString()}.</Card.Header> */}
                   <Card.Header>Posted by {this.props.user.username} on {item.postedOn} </Card.Header>
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
