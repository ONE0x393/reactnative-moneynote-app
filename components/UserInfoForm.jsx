import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserInfoForm.css';

function UserInfoForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직 구현
    console.log({ name, email, password, passwordConfirm, phoneNumber, verificationCode });

    alert('회원가입 되었습니다');
    
    navigate('/home');
  };

  const handleVerificationClick = () => {
    // 인증번호 발송 로직
    console.log('인증번호 발송');
  };

  return (
    <form onSubmit={handleSubmit} className="user-info-form">
      <div className="form-group">
        <label>이름</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름 필드"
        />
      </div>

      <div className="form-group">
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 필드"
        />
      </div>

      <div className="form-group">
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 필드"
        />
      </div>

      <div className="form-group">
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="비밀번호 확인 필드"
        />
      </div>

      <div className="password-rules">
        <p>비밀번호 규칙 확인</p>
      </div>

      <div className="form-group">
        <label>전화번호</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="전화번호 필드"
        />
        <button type="button" onClick={handleVerificationClick} className="verification-button">
          인증번호 발송
        </button>
      </div>

      <div className="form-group">
        <label>인증번호 입력</label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="인증번호 입력"
        />
      </div>

      <button type="submit" className="signup-button">회원 가입</button>
    </form>
  );
}

export default UserInfoForm;