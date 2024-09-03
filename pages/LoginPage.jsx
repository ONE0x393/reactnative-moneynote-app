import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 로그인 로직 구현 (예: 검증, API 호출 등)
    // 성공적으로 로그인하면 홈 페이지로 리다이렉트
    navigate('/home');
  };

  return (
    <div className="login-container">
      <h1>로그인 페이지</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>이메일</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>비밀번호</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;