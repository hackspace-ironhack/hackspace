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
import SearchPage from "./components/SearchPage";


class App extends React.Component {
  state = {
    user: undefined
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  componentDidMount = () => {
    this.loadUser()
  }

  loadUser = () => {
    axios.get("/api/auth/loggedin").then(response => {
      const user = response.data;
      this.setUser(user);
    });
  }

  render() {
    // if (this.state.user === undefined) {
    //   // redirects to signup if there is no user logged in
    //   return <Redirect to="/signup" />
    // }
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
            render={props => <About {...props} user={this.state.user} loadUser={this.loadUser} />}
          // render={props => {
          //   if (this.state.user) return <About {...props} user={this.state.user} />;
          // else return <Redirect to="/login" />}}  
          />

        {/* Route to show another person's profile */}
        <Route
          exact path="/profile/:id"
          render={props => <Profile {...props} user={this.state.user}/> }
          />
        {/* Route to show your own profile */}
        <Route
            exact path="/profile"
            render={props => <Profile {...props} user={this.state.user}/> }
        />
        <Route
          exact path="/chat/:id"
          render={props => <ChatPage {...props} user={this.state.user}/>}
        />

        <Route
          exact path="/chat"
          render={props => <ChatList user={this.state.user}/>}
        />

          {/* Route to search and list users with links to their profile */}
        <Route
            exact path="/search"
            render={props => <SearchPage user={this.state.user}/>}
        />
        </Switch>
      </div>
    );
  }
}

export default App;
