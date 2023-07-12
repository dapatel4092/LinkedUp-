// see SignupForm.js for comments
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
//importing our GraphQL mutation
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
// Login component that will be using our LOGIN_USER mutation
const Login = () => {
  //setting default form state to empty strings
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  //validation state
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  //adding our mutation to LoginForm
  const [login, { error }] = useMutation(LOGIN_USER);
  //Importing useEffect for error handling
  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

//input handler to update form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  //submit handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      //gathering user submitted dadta
      const { data } = await login({
        variables: { ...userFormData }
      });
      // Log in user and save token to local storage
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    //reset the for to empty strings
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };
// Actual login component
// Gathering all data from user and checking for validation
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Login;
