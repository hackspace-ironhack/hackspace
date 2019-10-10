import React from "react";
// import { Link } from "react-router-dom";
import { Form, Button, Card, ListGroup } from "react-bootstrap";


const ProjectList = props => {
  console.log("component props", props)
  return (
    <div>
      {/* {props.projects.length > 0 && <h2>Projects:</h2>} */}

      {props.portfolio.map((obj,i) => {
        return (
          <div key={i} className="projectbox">
            <Card border = "warning" style = {{width:'50rem', margin: '1rem'}}>
              <Card.Header>
                <h2> {obj.title}</h2>
              </Card.Header> 
               <Card.Body>
                 <Card.Title>
                  Stack: {obj.tools}
                 </Card.Title>
                <Card.Text>
                  Description: {obj.description}
                </Card.Text>
                <Card.Text>
                   Link:{obj.link}
                </Card.Text>
                
                </Card.Body>  
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;