import React, { useState } from 'react';
import Header from '../component/Header';
import Gameselection from '.Games.json';
import Footer from '../componets/Footer';
import SignUp from '../component/Signup';


export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState('About');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'Gameselection') {
      return <Gameselection />;
    }
    if (currentPage === 'Signup') {
      return <SignUp />;
    }
   
    
   
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      <Header currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
      <Footer />
    </div>
  );
}
