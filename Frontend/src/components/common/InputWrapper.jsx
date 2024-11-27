import React from 'react';

const InputWrapper = ({ label, id, type, }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        
        required
      />
    </div>
  );
};

export default InputWrapper;
