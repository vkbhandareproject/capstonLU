import React from "react";
import './UserNavbar.css'
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
const UserNavbar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="dark" className="bgnav">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default UserNavbar;
