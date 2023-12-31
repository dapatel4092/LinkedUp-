
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS_BY_GAME } from '../utils/queries';
import { Container, Row, Col } from 'react-bootstrap';
import {ADD_POST} from '../utils/mutations';

import PostList from '../component/Postlist';
import NewPostForm from '../component/NewPostform';

const ApexpostPage = ({ gameId }) => {
  const { loading, error, data } = useQuery(GET_POSTS_BY_GAME, {
    variables: { gameId },
  });

  const [addPost] = useMutation(ADD_POST);

  const handleSubmitPost = (content) => {
    addPost({
      variables: {
        content,
        gameId,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const apexStyle = {
    fontFamily: 'Broshk',
    backgroundColor: '#ff0000',
    padding: '20px',

  };

  const head1 = {
    color: '#eae7e7',
    fontSize: '48px',
    marginBottom: '10px',
    backgroundColor: '#5e0000',
    padding: '20px',
  };

  const parStyle = {
    color: '#eae7e7',
    fontSize: '24px',
    marginBottom: '10px',
    backgroundColor: '#5e0000',
  };


  return (
     <Container>
     <div style={apexStyle}>
      <h1 style={head1}>Apex Legends</h1>
      <p style ={parStyle}>Welcome to the Apex Legends page!</p>
      <img src="/images/apex-image.jpg" alt="Apex Legends" />
      <video src="/videos/apex-trailer.mp4" controls />
    </div>
      <Row>
        <Col>
          <PostList posts={data.postsByGame} />
        </Col>
      </Row>
      <Row>
        <Col>
          <NewPostForm onSubmit={handleSubmitPost} />
        </Col>
      </Row>
    </Container>
  );
};

export default ApexpostPage;



