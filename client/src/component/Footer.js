import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p>&copy; 2023 Your Company. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="/">Home</a>
              </li>
              <li className="list-inline-item">
                <a href="/about">About</a>
              </li>
              <li className="list-inline-item">
                <a href="/contact">Contact us</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
