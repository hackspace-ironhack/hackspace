import React from "react";
// import { Link } from "react-router-dom";

const ProjectList = props => {
  console.log("component props", props)
  return (
    <div>
      {/* {props.projects.length > 0 && <h2>Projects:</h2>} */}

      {props.portfolio.map((obj,i) => {
        return (
          <div key={i}>
            <h2>{obj.title}</h2>
            <h3>{obj.description}</h3>
            <h3>{obj.tools}</h3>
            <h3>{obj.link}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;