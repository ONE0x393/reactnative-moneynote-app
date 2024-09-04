import React, { useState } from 'react';
import './ToggleButtonGroup.css';

function ToggleButtonGroup({ options, selectedOption, onChange }) {
  return (
    <div className="toggle-button-group">
      {options.map((option) => (
        <button
          key={option}
          className={`toggle-button ${selectedOption === option ? 'selected' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default ToggleButtonGroup;