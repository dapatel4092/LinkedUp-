import React from 'react';
import { Card } from 'react-bootstrap';

const PostList = ({ posts }) => {
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <Card key={post._id}>
          <Card.Body>
            <Card.Title>{post.content}</Card.Title>
            <Card.Text>User: {post.user.username}</Card.Text>
            <Card.Text>Game: {post.game.name}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
