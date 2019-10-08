//like Post.. 
//it will be called by Profile
// it will have add project and project list

import React, {Component} from "react";
// import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import axios from "axios";

export default class portfolio extends Component {
  state = {
    portfolio:[]
  };

  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    axios.get("api/portfolio")
    .then(response => {
      this.setState({
        portfolio:response.data
      });
    })
    .catch(err => {
      console.log (err);
    });
  }

render () {
  return (
    <div className="portfolioContainer">
      <h2>projects</h2>
      <AddProject getData={this.getData}/>
      {/* <ProjectList portfolio={this.state.portfolio} /> */}
    </div>
  );
}


}