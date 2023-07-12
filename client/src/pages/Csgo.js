
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS_BY_GAME, ADD_POST } from '../utils/queries';
import { Container, Row, Col } from 'react-bootstrap';

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

  return (
    <Container>
      <div>
      <h1>Counter-Strike: Global Offensive</h1>
      <p>Welcome to the Counter-Strike: Global Offensive page!</p>
      <img src="/images/csgo-image.jpg" alt="CSGO" />
      <button>Play CSGO</button>
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

