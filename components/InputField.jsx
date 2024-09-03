import React from 'react';
import './InputField.css';

function InputField({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-field"
    />
  );
}

export default InputField;