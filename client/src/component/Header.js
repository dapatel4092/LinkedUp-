import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import SignUp from './Signup';
import Login from './Login';
import Auth from '../utils/auth';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };

  const handleSignupModalClose = () => {
    setShowSignupModal(false);
  };

  const handleSignupModalOpen = () => {
    setShowSignupModal(true);
  };

  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='mb-4'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='display-4'>
          LinkedUp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar' />
        <Navbar.Collapse id='navbar'>
          <Nav className='mr-auto'>
            <Nav.Link as={Link} to='/games'>
              View Games
            </Nav.Link>
          </Nav>
          {Auth.loggedIn() ? (
            <Nav>
              <Nav.Link as={Link} to='/saved'>
                Profile
              </Nav.Link>
              <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
            </Nav>
          ) : (
            <>
              <Button variant='light' onClick={handleLoginModalOpen} className='authButton'>
                Login
              </Button>
              <Button variant='light' onClick={handleSignupModalOpen} className='authButton'>
                Sign Up
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
      <Modal show={showLoginModal} onHide={handleLoginModalClose} aria-labelledby='login-modal'>
        <Modal.Header closeButton>
          <Modal.Title id='login-modal'>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login handleModalClose={handleLoginModalClose} />
        </Modal.Body>
      </Modal>
      <Modal show={showSignupModal} onHide={handleSignupModalClose} aria-labelledby='signup-modal'>
        <Modal.Header closeButton>
          <Modal.Title id='signup-modal'>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUp handleModalClose={handleSignupModalClose} />
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default Header;