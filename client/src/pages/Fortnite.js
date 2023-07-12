
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS_BY_GAME,  } from '../utils/queries';
import { Container, Row, Col } from 'react-bootstrap';
import {ADD_POST} from '../utils/mutations';

import PostList from '../component/Postlist';
import NewPostForm from '../component/NewPostform';

const FortnitepostPage = ({ gameId }) => {
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

  
    const pageStyle = {
        fontFamily: 'Burbank',
        backgroundColor: '#3d02bd',
        padding: '20px'
    };
    const headingStyle = {
        color: '#fbefff',
        fontSize: '48px',
        fontWeight: 'bold',
        marginBottom: '10px',
    };
    const pStyle = {
        color: '#e25bff',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px'
    }
    return (
        <Container>
    
    <div style= {pageStyle}>
      <h1 style={headingStyle}>Fortnite</h1>
      <p style={pStyle}>FORTNITE!</p>
      <img src="/images/fortnite-image.jpg" alt="Fortnite" />
      <button>Play Fortnite</button>
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

export default FortnitepostPage;

