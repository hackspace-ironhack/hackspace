import React from "react";
import Navbar from "./components/Navbar";
import { Route, Redirect, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ChatPage from "./components/ChatPage";
import ChatList from "./components/ChatList";
import TaskDetails from "./components/ToDoList";
import axios from "axios";

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

  componentDidMount() {
    axios.get("/api/auth/loggedin").then(response => {
      const user = response.data;
      this.setUser(user);
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />

      <Switch>
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
            if (this.state.user) return <About {...props} user={this.state.user} />;
          else return <Redirect to="/login" />}}  
          />

        <Route
          exact path="/profile"
          render={props => {
            if (this.state.user) return <Profile {...props} user={this.state.user}/>;
            else return <Redirect to="/login" />
            
          }}
        />
        </Switch>

        <Route
          exact path="/chat/:id"
          render={props => <ChatPage {...props} user={this.state.user}/>}
        />

        <Route
          exact path="/chat"
          render={props => <ChatList user={this.state.user}/>}
        />

        <Route exact path="/tasks/:id" component={TaskDetails} />
      </div>
    );
  }
}

export default App;
