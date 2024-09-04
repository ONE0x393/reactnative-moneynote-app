import React from 'react';
import './InputField.css';

function InputField({ label, value, onChange }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input 
        type="text" 
        value={value} 
        onChange={(e) => onChange(e.target.value)} 
      />
    </div>
  );
}

export default InputField;