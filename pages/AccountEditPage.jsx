import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams와 useNavigate 사용
import Header from '../components/Header';
import InputField from '../components/InputField';
import ToggleButtonGroup from '../components/ToggleButtonGroup';
import ActionButtons from '../components/ActionButtons';
import './AccountEditPage.css';

function AccountEditPage() {
  const { accountId } = useParams(); // accountId 파라미터 받아오기
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  const [type, setType] = useState('수입');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [bank, setBank] = useState('?? 은행');

  const handleSave = () => {
    console.log({ type, amount, account, bank });
    // 저장 로직 추가

    // 저장 후 이전 페이지로 이동
    navigate(-1); // 이전 페이지로 이동
  };

  const handleEdit = () => {
    console.log('수정 클릭');
    // 수정 로직 추가
  };

  return (
    <div className="account-edit-page">
      <Header />
      <h2>계좌 수정 페이지 (계좌 ID: {accountId})</h2> {/* 계좌 ID 표시 */}
      <ToggleButtonGroup 
        options={['수입', '지출']}
        selectedOption={type}
        onChange={setType}
      />
      <InputField 
        label="금액" 
        value={amount} 
        onChange={setAmount} 
      />
      <InputField 
        label="계좌/카드" 
        value={account} 
        onChange={setAccount} 
      />
      <InputField 
        label="은행" 
        value={bank} 
        onChange={setBank} 
      />
      <ActionButtons 
        onSave={handleSave} 
        onEdit={handleEdit} 
      />
    </div>
  );
}

export default AccountEditPage;