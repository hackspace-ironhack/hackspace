// 

import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";


const MainRouter = () => (
    <div>
       <Navbar/>
       <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/profile" component={Profile} />
         
       </Switch>
    </div>
);

export default MainRouter;
