import React from 'react';
import { Link } from 'react-router-dom'; // We'll use this later

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to the Jharkhand Civic Reporting Platform</h1>
      <p>Your voice for a better city.</p>
      {/* We will style these links as buttons later */}
      <Link to="/login">Login</Link>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
};

export default LandingPage;