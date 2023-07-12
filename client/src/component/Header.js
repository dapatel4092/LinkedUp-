import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Modal } from 'react-bootstrap';
import SignUp from './Signup';
import Login from './Login';
import Auth from '../utils/auth';
//Header page acts as our main form of navigation throughout the site
const Header = () => {
  //we will be using modals for both out signiup and login
  //setting their intial state to false until needed
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  //changing state of modals
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

  //Our actual navbar component with conditional rendering depending on the users logged in state
  return (
    <Navbar bg='dark' variant='dark' expand='lg' className='mb-4'style={{ height: '150px' }}>
      <Container>
        <Navbar.Brand as={Link} to='/' className='display-4'style={{ 'font-size': '36px' }}>
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
              <Nav.Link as={Link} to='/profile'>
                Profile
              </Nav.Link>
              <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
            </Nav>
          ) : (
            <>
              <Button variant='primary' onClick={handleLoginModalOpen} className='authButton' style={{ 'margin-left': '10px' }}>
                Login
              </Button>
              <Button variant='info' onClick={handleSignupModalOpen} className='authButton' style={{ 'margin-left': '10px'}}>
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