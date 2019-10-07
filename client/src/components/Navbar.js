import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/api";

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const Navbar = props => {
  return (
    <Nav className="nav justify-content-end" bg="primary">
      {props.user && <Nav.Brand>Welcome, {props.user.username}</Nav.Brand>}
      <Nav.Brand>
        <Link to="/"></Link>
      </Nav.Brand>

      {props.user ? (
        <>
          <Nav.Brand>
            <Link to="/projects">Projects</Link>
          </Nav.Brand>
          {/* <Nav.Brand>
            <Link to="/tasks">Tasks</Link>
          </Nav.Brand> */}
          {/* <Nav.Brand>
            <Link to="/projects">Projects</Link>
          </Nav.Brand> */}
          <Nav.Brand>
            <Link to="/" onClick={() => handleLogout(props)}>
              Logout
            </Link>
          </Nav.Brand>
        </>
      ) : (
        <>
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
