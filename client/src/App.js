// importing all packages needed for apollo to run
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer'
import Gameselection from './component/Gameselection'
import HomePage from './component/HomePage';
import './app.css'
import Profile from './pages/ProfilePage';

//Setting our graphql uri
const httpLink = createHttpLink({
  uri: '/graphql',
});

//Retrieving out user authenication token from local storage
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
//Concatinating these two together
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//Created routes to navigate the application from our navbar using React Router
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/games' element={<Gameselection />} />
          <Route path= '/profile' element={<Profile/>} />
          <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
        <Footer/>
      </Router>
    </ApolloProvider>
  );
}


export default App;