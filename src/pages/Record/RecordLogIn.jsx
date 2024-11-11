// import React from 'react';
import './recordlogin.scss';

function RecordLogin() {

  return (
    <div className="record-login-container">
      <p className="record-login-title">
        로그인 후,<br />해당 서비스를 이용해 주세요.
      </p>
      <div className="record-login-buttons">
        <button className="record-login-button">로그인</button>
        <button className="record-signup-button">회원가입</button>
        {/* 네비게이션 추가 필요! */}
      </div>
    </div>
  )
}

export default RecordLogin;
