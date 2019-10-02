import React from "react";
import Navbar from "./components/Navbar";
import { Route, Redirect } from "react-router-dom";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
import TaskDetails from "./components/ToDoDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css"

class App extends React.Component {
  state = {
    user:
      this.props.user
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />

        {/* prevent a non-logged in user to access certain paths */}

        <Route exact path="/projects" render={props => {
          if (this.state.user) return <Projects {...props} />;
          else return <Redirect to="/" />;
        }} />

        {/* <Protected exact path="/projects"
        redirectPath="/"
        user={this.state.user}
        component={Projects} */}

        <Route exact path="/projects/:id" render={props =>
          <ProjectDetails {...props}
            user={this.state.user} />}
        />

        <Route exact path="/tasks/:id" component={TaskDetails} />
        <Route exact path="/signup" render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={props => <Login setUser={this.setUser} {...props} />}
        />
      </div>
    );
  }
}

export default App;
