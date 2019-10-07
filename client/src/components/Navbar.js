import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav} from "react-bootstrap";

import { logout } from "../services/api";

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const handleProject = props => {
  // project().then(()=>{
  //   props.setUser()
  // });
  
};

const Navigation = props => {
  return (
    // <Nav className="nav justify-content-end" bg="dark" variant="light">
    //   {/* {props.user && <Nav.Brand>Welcome, {props.user.username}</Nav.Brand>} */}
    //   <Nav.Brand>
    //     <Link to="/signup"></Link>
    //   </Nav.Brand>


    //   {props.user ? (
    //     <>
    //   <Nav.Brand>
    //     <Link to="/projects" onClick = {() =>handleProject(props)}>Projects</Link>
    //   </Nav.Brand>
        
    //   <Nav.Brand>
    //     <Link to="/chat">Chat</Link>
    //   </Nav.Brand>

    //   <Nav.Brand>
    //     <Link to="/todolist">Things to do</Link>
    //   </Nav.Brand> 

    //   <Nav.Brand>
    //     <Link to="/" onClick={() => handleLogout(props)}> Logout </Link>
    //   </Nav.Brand>
    //     </>
    //   ) : (
    //     <>
    //     {/* div to get the 1st page */}
    //     {/* delete the nav bar */}
    //       <Nav.Brand>
    //         <Link to="/signup">Signup</Link>
    //       </Nav.Brand>
    //       <Nav.Brand>
    //         <Link to="/login">Login</Link>
    //       </Nav.Brand>
          
    //     </>
    //   )}
    // </Nav>

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">Hackspace</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <div className="salutation">
    {props.user && <Nav.Item>Welcome, {props.user.username}!</Nav.Item>}
          </div>
          {props.user ? (
            //  LOGGED USER
            <>
              <Nav.Item>
                <Link className="bar-links" to="/projects" onClick = {() =>handleProject(props)}>Projects</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="bar-links" to="/chat">Chat</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="bar-links" to="/todolist">Things to do</Link>
              </Nav.Item>
              <Nav.Item>
              <Link className="bar-links" to="/" onClick={() => handleLogout(props)}> Logout </Link>
              </Nav.Item>
            </>
          ) : (
              // NO LOGGED USER
              <>
                <Nav.Item>
                  <Link className="bar-links" to="/signup">Signup</Link>
                </Nav.Item>
                <Nav.Item>
                <Link className="bar-links" to="/login">Login</Link>
                </Nav.Item>
              </>
            )}
    
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
  );
};

export default Navigation;
