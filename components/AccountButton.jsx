import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountButton.css';

const AccountButton = ({ id, name, text, amount }) => { // id 추가
  const navigate = useNavigate();

  const 계좌수정 = () => {
    // 계좌 ID를 포함한 경로로 이동
    navigate(`/accountedit/${id}`);
  };

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