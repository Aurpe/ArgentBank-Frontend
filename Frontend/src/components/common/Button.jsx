import React from 'react';
import { Link } from 'react-router-dom'; 

const Button = () => {
  return (
    <form>
     
      <Link to="/user" className="sign-in-button">
        Sign In
      </Link>

      
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
};

export default Button;

