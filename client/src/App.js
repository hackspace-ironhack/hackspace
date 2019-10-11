import React from "react";
import Navbar from "./components/Navbar";
import { Route, Redirect, Switch } from "react-router-dom";
import AnimatedText from "./components/AnimatedText";
import Profile from "./components/Profile";
import About from "./components/About";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Portfolio from "./components/Portfolio";
import ChatPage from "./components/ChatPage";
import FriendList from "./components/FriendList";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import UploadProfilePic from "./components/UploadProfilePic";
import UploadMedia from "./components/UploadMedia";


class App extends React.Component {
  state = {
    user: undefined,
    loadingUser: true,
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  componentDidMount = () => {
    this.loadUser();
  };

  loadUser = () => {
    axios.get("/api/auth/loggedin").then(response => {
      const user = response.data;
      this.setState({ user: user, loadingUser: false });
    }).catch((error) => {
      this.setState({ user: undefined , loadingUser: false });
    });
  }

  render() {
    if (this.state.loadingUser) {
      return <div></div>;
    }
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route
            exact path="/"
            render={props => {
              return <Signup user={this.state.user} setUser={this.setUser} {...props} />
            }}
          />
          <Route
            exact path="/login"
            render={props => <Login user={this.state.user} setUser={this.setUser} {...props} />}
          />

          <Route
            exact path="/about"
            render={props => <About {...props} user={this.state.user} loadUser={this.loadUser} />}
          />

          {/* Route to show another person's profile */}
          <Route
            exact path="/profile/:id"
            render={props => <Profile setUser={this.setUser} {...props} user={this.state.user} />}
          />

          {/* Route to show your own profile */}
          <Route
            exact path="/profile"
            render={props => <Profile setUser={this.setUser} loadUser={this.loadUser} {...props} user={this.state.user} />}
          />
          <Route
            exact path="/portfolio"
            render={props => <Portfolio {...props} user={this.state.user} />}
          />
          <Route
            exact path="/chat/:id"
            render={props => <ChatPage {...props} user={this.state.user} />}
          />

          {/* <Route
          exact path="/scheduler"
          render={props => <Schedule {...props} user={this.state.user}/>}
        /> */}

        <Route
          exact path="/chat"
          render={props => <FriendList user={this.state.user} chat/>}
        />

        <Route
            exact path="/contacts"
            render={props => <FriendList user={this.state.user} profile/>}
        />

          <Route
            exact path="/userimage"
            render={props => <UploadProfilePic />}
          />

          <Route
            exact path="/uploadedmedia"
            render={props => <UploadMedia />}
          />



          {/* Route to search and list users with links to their profile */}
          <Route
            exact path="/search"
            render={props => <SearchPage user={this.state.user} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
