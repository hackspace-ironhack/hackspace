import React from "react";
// import { Link } from "react-router-dom";
import {Card} from "react-bootstrap";

const PostList = props => {
  
  return (
    <div>
      {/* {!props.posts ? "" :  <h2>My Posts</h2>} */}

      {!props.posts ? "" : props.posts.map((obj,i) => {
        return (
          <Card border="light">
              <Card.Header>Posted by {props.user.name} on {Date()}.</Card.Header>
              <Card.Body>
                <Card.Title>PLACE HOLDER FOR POSTs</Card.Title>
                <Card.Text>
                {obj.post}
                </Card.Text>
              </Card.Body>
              </Card>
        );
      })}
    </div>
  );
};

export default PostList;
