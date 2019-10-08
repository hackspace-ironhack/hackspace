import React from "react";
import { Link } from "react-router-dom";

const PostList = props => {
  console.log("posts Lit", props)
  return (
    <div>
      {!props.posts ? "" :  <h2>My Posts</h2>}

      {!props.posts ? "" : props.posts.map((obj,i) => {
        return (
          <div key={i}>
              <h2>{obj.post}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
