import React from "react";
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">My Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#Home">Home</Nav.Link>
            <Nav.Link href="#Profile">About</Nav.Link>
            <Nav.Link href="#">Social</Nav.Link>
            <Nav.Link href="#contact">C</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
