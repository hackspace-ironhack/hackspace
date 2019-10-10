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
import ChatList from "./components/ChatList";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import UploadProfilePic from "./components/UploadProfilePic";


class App extends React.Component {
  state = {
    user: undefined,
    loadingUser: false,
  };

  setUser = user => {
    this.setState({
      user: user
    });
  };

  componentDidMount = () => {
    this.setState({ loadingUser: true });
    this.loadUser();
  }
  loadUser = () => {
    axios.get("/api/auth/loggedin").then(response => {
      const user = response.data;
      this.setState({ user: user , loadingUser: false});
    }).catch((error) => {
      this.setState({ user: undefined , loadingUser: false});
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
        render={props => <Signup user={this.state.user} setUser={this.setUser} {...props} />}
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
          render={props => <Profile {...props} user={this.state.user}/> }
          />
      
          {/* Route to show your own profile */}
        <Route
        exact path="/profile"
        render={props => <Profile {...props} user={this.state.user}/> }
        />
        <Route
         exact path="/portfolio"
         render={props => <Portfolio {...props} user={this.state.user}/>}
        />
        <Route
          exact path="/chat/:id"
          render={props => <ChatPage {...props} user={this.state.user}/>}
        />

        {/* <Route
          exact path="/scheduler"
          render={props => <Schedule {...props} user={this.state.user}/>}
        /> */}

        <Route
          exact path="/chat"
          render={props => <ChatList user={this.state.user}/>}
        />

       <Route
          exact path="/userimage"
          render={props => <UploadProfilePic/>}
        />

          {/* Route to search and list users with links to their profile */}
        <Route
            exact path="/search"
            render={props => <SearchPage user={this.state.user}/>}
        />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;
