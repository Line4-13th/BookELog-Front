// import React from 'react';
import './recordlogin.scss';
import { useNavigate } from 'react-router-dom';

function RecordLogin() {
  const navigate = useNavigate();

  return (
    <div className="record-login-container">
      <p className="record-login-title">
        로그인 후,<br />해당 서비스를 이용해 주세요.
      </p>
      <div className="record-login-buttons">
        <button className="record-login-button" onClick={() => navigate('/login')}>로그인</button>
        <button className="record-signup-button" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </div>
  )
}

export default RecordLogin;
