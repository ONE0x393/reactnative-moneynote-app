import React from 'react';
import './AgreeButton.css';

function AgreeButton({ onAgree }) {
  return (
    <div className="agree-button-container">
      <button className="agree-button" onClick={onAgree}>
        약관 동의 버튼
      </button>
    </div>
  );
}

export default AgreeButton;