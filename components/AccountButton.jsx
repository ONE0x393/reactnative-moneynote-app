import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './AccountButton.css';

const AccountButton = ({ name, text, amount }) => {
  const to_link = useNavigate();
  const 계좌수정 =()=>{
    to_link('/');
  }
  return (
    <button className="custom-button" onClick={계좌수정}>
      <div className="content">
        <div className="top-left">
          <div className="name">{name}</div>
          <div className="text">{text}</div>
        </div>
        <div className="bottom-right">
          <div className="amount">{amount}원</div>
        </div>
      </div>
    </button>
  );
};

export default AccountButton;