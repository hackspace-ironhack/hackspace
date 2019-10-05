import React from "react";
import Navbar from "./components/Navbar";
import { Route, Redirect } from "react-router-dom";
import Profile from "./components/Profile";
import About from "./components/About";
import ProjectDetails from "./components/ProjectDetails";
import TaskDetails from "./components/TaskDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends React.Component {
  state = {
    user: this.props.user
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

        <Route
        exact path="/signup"
        render={props => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
        exact path="/login"
        render={props => <Login setUser={this.setUser} {...props} />}
        />
        
        <Route
          exact path="/about"
          render={props => {
            if (this.state.user) return <About {...props} />;
            else return <Redirect to="/about" />;
          }}
        />

        <Route
          exact
          path="/profile/:id"
          render={props => <ProjectDetails {...props} user={this.state.user} />}
        />

        <Route exact path="/tasks/:id" component={TaskDetails} />
      </div>
    );
  }
}

export default App;
