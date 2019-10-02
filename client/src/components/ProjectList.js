import React from "react";
import { Link } from "react-router-dom";

const ProjectList = props => {
  return (
    <div>
      {props.projects.length > 0 && <h2>Projects:</h2>}

      {props.projects.map(project => {
        return (
          <div key={project._id}>
            <h3>
              <Link to={`/projects/${project._id}`}>{project.title}</Link>
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
