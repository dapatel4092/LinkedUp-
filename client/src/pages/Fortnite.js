import React from 'react';

const Fortnite = () => {
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
    
    <div style= {pageStyle}>
      <h1 style={headingStyle}>Fortnite</h1>
      <p style={pStyle}>FORTNITE!</p>
      <img src="/images/fortnite-image.jpg" alt="Fortnite" />
      <button>Play Fortnite</button>
    </div>
  );
};

export default Fortnite;
