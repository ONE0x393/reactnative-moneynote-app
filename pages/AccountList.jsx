import React, { useState } from "react";
import './AccountList.css';
import AccountButton from "../components/AccountButton";
import '../index.css';
import FloatingButton from "../components/FloatingButton";
import { useNavigate } from 'react-router-dom';

function AccountList() {
  const navigate = useNavigate();

  // 계좌 목록 데이터 (계좌 정보가 담긴 배열)
  const accounts = [
    { id: 1, name: 'a계좌', text: 'xxxx-xxxx-xxxx', amount: 300000 },
    { id: 2, name: 'b계좌', text: '임시로 homepage로 이동설정', amount: 500000 },
    { id: 3, name: 'c계좌', text: 'xxxx-xxxx-xxxx', amount: 400000 }
  ];

  const handleAccountClick = (accountId) => {
    // AccountEdit 페이지로 이동하면서 accountId를 전달
    navigate(`/accountedit/${accountId}`);
  };

  // 상태 관리 예시 (지출/수입)
  let [지출] = useState(100000);
  let [수입] = useState(200000);

  return (
    <div className="page">
      {/* 계좌 목록을 AccountButton 컴포넌트로 표시 */}
      {accounts.map(account => (
        <AccountButton
          key={account.id}
          name={account.name}
          text={account.text}
          amount={account.amount}
          onClick={() => handleAccountClick(account.id)} // 계좌 클릭 시 이동
        />
      ))}

      {/* 플로팅 버튼 */}
      <FloatingButton targetPath="/accountedit/1" /> {/* accountform으로 이동 */}
    </div>
  );
}

export default AccountList;