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
      <h1 className="app-name">앱 이름</h1>

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email(ID) Field"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password Field"
          />
        </div>
        <button type="submit" className="submit-button">로그인</button>
      </form>

      <div className="links-container">
        <a href="/forgot-password" className="link">계정을 잊으셨나요?</a>
        <a href="/create-account" className="link">회원가입</a>
      </div>

      <div className="social-login-container">
        <button className="social-button">N</button>
        <button className="social-button">G</button>
        <button className="social-button">F</button>
        <button className="social-button">T</button>
      </div>
    </div>
  );
}

export default LoginPage;