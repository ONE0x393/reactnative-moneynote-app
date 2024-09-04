import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingButton.css';

const FloatingButton = ({ targetPath }) => { // targetPath라는 props로 경로 전달
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(targetPath); // props로 받은 경로로 이동
  };

  return (
    <div className="floating-button" onClick={handleClick}>
      +
    </div>
  );
};

export default FloatingButton;