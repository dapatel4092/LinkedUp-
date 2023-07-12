import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Home page for our site
// Just acts as a sort of main page
const HomePage = () => {
  return (
    <Container fluid className="d-flex justify-content-center" style={{ minHeight: '100vh', paddingTop: '20px' }}>
      <Row className="justify-content-center welcome">
        <Col md={10} lg={8}>
          <h1 className="text-center display-4">Welcome to LinkedUp!</h1>
          <p className="text-center fs-5">
            Thanks for joining us at LinkedUp! Our platform connects gamers from around the world, providing a space to discover and engage with your favorite games and fellow gamers. Whether you're a casual player or a hardcore enthusiast, LinkedUp offers a diverse selection of games to explore and connect with like-minded individuals. Join our vibrant gaming community, share your gaming experiences, and stay up-to-date with the latest news and discussions. Level up your gaming journey with LinkedUp!
          </p>
          <p className="text-center fs-5">
            With our intuitive user interface and powerful features, you can easily create your gaming profile, customize your preferences, and interact with other gamers. Discover new games, join up with a new party, and showcase your achievements! LinkedUp is your one-stop destination for all things gaming. Get started today and unlock a world of gaming possibilities!
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;