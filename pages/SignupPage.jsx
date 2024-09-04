import React from 'react';
import Header from '../components/Header';
import UserInfoForm from '../components/UserInfoForm';
import './SignupPage.css';

function SignupPage() {
  return (
    <div className="signup-page">
      <Header />
      <h2 className="signup-title">사용자 정보 입력</h2>
      <UserInfoForm />
    </div>
  );
}

export default SignupPage;