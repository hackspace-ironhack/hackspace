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
    <Nav className="nav justify-content-end" bg="dark" variant="light">
      {props.user && <Nav.Brand>Welcome, {props.user.username}</Nav.Brand>}
      <Nav.Brand>
        <Link to="/"></Link>
      </Nav.Brand>

      <Nav.Brand>
        <Link to="/chat">Chat</Link>
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

//     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//   <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//   <Navbar.Collapse id="responsive-navbar-nav">
//     <Nav className="mr-auto">
//       <Nav.Link href="#features">Features</Nav.Link>
//       <Nav.Link href="#pricing">Pricing</Nav.Link>
//       <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//       </NavDropdown>
//     </Nav>
//     <Nav>
//       <Nav.Link href="#deets">More deets</Nav.Link>
//       <Nav.Link eventKey={2} href="#memes">
//         Dank memes
//       </Nav.Link>
//     </Nav>
//   </Navbar.Collapse>
// </Navbar>
  );
};

export default Navbar;
