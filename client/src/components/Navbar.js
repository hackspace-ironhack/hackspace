import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import { logout } from "../services/api";
import logo from "../images/logo-gray(1).png"

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const handleProject = props => {
  //  portfolio().then(()=>{
  //   props.setUser()
  //  });

};

const Navigation = props => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to={props.user ? "/profile" : "/"}><Image className="navbar-logo" src={logo} /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="navbar-content">
        <Nav className="mr-auto">
          <div className="salutation">
            {props.user && <Nav.Item>Welcome, {props.user.name}!
                </Nav.Item>}
          </div></Nav>
        <Nav >
           
            
            {props.user ? (
              //  LOGGED USER
              <div className="nav-container">
                <Nav.Item>
                  <Link className="bar-links" to="/profile">Profile</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="bar-links" to="/portfolio">Portfolio</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="bar-links" to="/chat">Chat</Link>
                </Nav.Item>
                <Nav.Item>
                  <Link className="bar-links" to="/search">Find Users</Link>
                </Nav.Item>
                <Nav.Item>
                <Link className="bar-links" to="/" onClick={() => handleLogout(props)}> Logout </Link>
              </Nav.Item>
            </div>
          ) : (
              // NO LOGGED USER
              <div className="nav-container">
                {/* <Nav.Item>
                    <Link className="bar-links" to="/signup">Signup</Link>
                  </Nav.Item> */}
                <Nav.Item>
                  <Link className="bar-links" to="/login">Login</Link>
                </Nav.Item>
              </div>

            )}

        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
