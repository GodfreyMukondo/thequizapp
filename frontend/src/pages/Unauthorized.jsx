import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer'


function Unauthorized() {
  return (
    <>
      <Header />
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1 style={{ color: 'red' }}>403 - Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
        <Link to="/dashboard">
          <button style={{ marginTop: '20px', padding: '10px 20px' }}>
            Go to Dashboard
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Unauthorized;
