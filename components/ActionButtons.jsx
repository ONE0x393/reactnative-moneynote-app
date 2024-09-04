import React from 'react';
import './ActionButtons.css';

function ActionButtons({ onSave, onEdit }) {
  return (
    <div className="action-buttons">
      <button onClick={onEdit}>수정</button>
      <button onClick={onSave}>저장</button>
    </div>
  );
}

export default ActionButtons;