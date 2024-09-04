import React from 'react';
import './TermsContent.css';

function TermsContent() {
  return (
    <div className="terms-content">
      <h2>약관 설명</h2>
      <div className="terms-box">
        <p>여기에 약관 내용을 표시합니다...</p>
        {/* 스크롤이 가능한 약관 내용 */}
      </div>
    </div>
  );
}

export default TermsContent;