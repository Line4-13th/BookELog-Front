// src/pages/Home/ResetPassword.jsx
import React, { useState } from 'react';
import './ResetPassword.scss'; // For ResetPassword.jsx

const ResetPassword = ({ setView }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="reset-password-form">
      <h2>비밀번호 재설정</h2>
      <p>비밀번호를 재설정하려면 이메일을 입력하세요.</p>
      <input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={() => alert('비밀번호 재설정 이메일이 전송되었습니다.')}>
        send
      </button>
      
      <div className="link-text">
        <span onClick={() => setView('login')}>로그인으로 돌아가기</span>
      </div>
    </div>
  );
};

export default ResetPassword;
