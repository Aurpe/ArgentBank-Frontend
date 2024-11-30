import React from 'react';
import { Link } from 'react-router-dom';
import '../common/Button.scss';

const EditButton = () => {
  return (
    <>
      <Link to="/user" className="sign-in-button">
        Sign In
      </Link>
    </>
  );
};

export default EditButton;


