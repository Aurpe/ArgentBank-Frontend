
import React from 'react';
import '../common/InputCheckbox.scss';

const InputCheckbox = ({ id, label, checked, onChange }) => {
  return (
    <div className="input-remember">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default InputCheckbox;
