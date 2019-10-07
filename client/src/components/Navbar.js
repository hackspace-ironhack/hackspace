import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
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

const Navbar = props => {
  return (
    <Nav className="nav justify-content-end" bg="dark" variant="light">
      {/* {props.user && <Nav.Brand>Welcome, {props.user.username}</Nav.Brand>} */}
      <Nav.Brand>
        <Link to="/signup"></Link>
      </Nav.Brand>


      {props.user ? (
        <>
      <Nav.Brand>
        <Link to="/projects" onClick = {() =>handleProject(props)}>Projects</Link>
      </Nav.Brand>
        
      <Nav.Brand>
        <Link to="/chat">Chat</Link>
      </Nav.Brand>

      <Nav.Brand>
        <Link to="/todolist">Things to do</Link>
      </Nav.Brand> 

      <Nav.Brand>
        <Link to="/" onClick={() => handleLogout(props)}> Logout </Link>
      </Nav.Brand>
        </>
      ) : (
        <>
        {/* div to get the 1st page */}
        {/* delete the nav bar */}
          <Nav.Brand>
            <Link to="/signup">Signup</Link>
          </Nav.Brand>
          <Nav.Brand>
            <Link to="/login">Login</Link>
          </Nav.Brand>
          
        </>
      )}
    </Nav>
  );
};

export default Navbar;
