import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MoneyChangeButton.css';

const MoneyChangeButton = ({ date, text, amount, type }) => {
  const navigate = useNavigate();
  const 소비량수정 =()=>{
    navigate('/accountform');
  }
  return (
    <button className={`custom-button ${type === 0 ? 'expense' : 'income'}`} onClick={소비량수정}>
      <div className="content">
        <div className="top-left">
          <div className="date">{date}</div>
          <div className="text">{text}</div>
        </div>
        <div className="bottom-right">
          <div className="amount">{amount}</div>
        </div>
      </div>
    </button>
  );
};

export default MoneyChangeButton;