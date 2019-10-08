import React from "react";
// import { Link } from "react-router-dom";

const ProjectList = props => {
  return (
    <div>
      {/* {props.projects.length > 0 && <h2>Projects:</h2>} */}

      {props.portfolio.map((obj,i) => {
        return (
          <div key={i}>
            <h2>{portfolio.title}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;