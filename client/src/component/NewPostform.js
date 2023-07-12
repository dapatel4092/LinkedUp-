import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const NewPostForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Make ur post to Link up!"
            rows={4}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewPostForm;

