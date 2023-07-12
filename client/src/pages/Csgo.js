import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS_BY_GAME,} from '../utils/queries';
import { Container, Row, Col } from 'react-bootstrap';
import {ADD_POST} from '../utils/mutations';

import PostList from '../component/Postlist';
import NewPostForm from '../component/NewPostform';

const CsgopostPage = ({ gameId }) => {
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

  const csgoStyle = {
    fontFamily: 'Helvetica Neue',
    backgroundColor: '#ccba7c',
    padding: '20px',
  };

  const csgoHead = {
    color: '#0c0f12',
    fontSize: '48px',
    marginBottom: '10px',
    backgroundColor: '#de9b35',
    padding: '20px',
  };

  const csgoP = {
    color: '#0c0f12',
    fontSize: '24px',
    marginBottom: '10px',
    backgroundColor: '#5d79ae',
    padding: '20px',
  };

  return (
    <Container>
      <div style={csgoStyle}>
      <h1 style={csgoHead}>Counter-Strike: Global Offensive</h1>
      <p style={csgoP}>Welcome to the Counter-Strike: Global Offensive page!</p>
      <img src="/images/csgo-image.jpg" alt="CSGO" />
      
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

export default CsgopostPage;

