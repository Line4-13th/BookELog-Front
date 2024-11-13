// src/pages/Home/SignUp.jsx
import React, { useState } from 'react';
import './SignUp.scss'; // For SignUp.jsx

const SignUp = ({ setView }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleSuccessfulSignUp = () => {
    if (!userId || !password || !confirmPassword || !nickname || !email) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    localStorage.setItem('userData', JSON.stringify({
      userId,
      password,
      nickname,
      email,
    }));

    setView('success');
  };

  return (
    <div className="signup-form">
      <h2>회원가입</h2>
      <input 
        placeholder="아이디" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
      />
      <input 
        placeholder="비밀번호" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <input 
        placeholder="비밀번호 확인" 
        type="password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
      />
      <input
        placeholder="별명"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)} 
      />
      <input 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <button onClick={handleSuccessfulSignUp}>Sign up</button>
      <div className="link-text">
        이미 계정이 있으신가요? <span onClick={() => setView('login')}>Login</span>
      </div>
    </div>
  );
};

export default SignUp;
