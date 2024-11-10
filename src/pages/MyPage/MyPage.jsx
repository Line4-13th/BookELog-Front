// src/pages/Home/MyPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.scss';

const MyPage = () => {
  const [view, setView] = useState('landing'); // landing, login, signup, success, resetPassword
  const [userId, setUserId] = useState(''); // Store user ID input
  const [password, setPassword] = useState(''); // Store password input
  const [confirmPassword, setConfirmPassword] = useState(''); // Store password confirmation input
  const [nickname, setNickname] = useState(''); // Store nickname input
  const [email, setEmail] = useState(''); // Store email input
  const [loginUserId, setLoginUserId] = useState(''); // User ID for login input
  const [loginPassword, setLoginPassword] = useState(''); // Password for login input
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setView('login');
  };

  const handleSignUpClick = () => {
    setView('signup');
  };

  const handlePasswordResetClick = () => {
    setView('resetPassword');
  };

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

    localStorage.setItem('initialUserData', JSON.stringify({
      userId,
      password,
      nickname,
      email,
    }));

    setView('success');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLogin = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData && loginUserId === storedUserData.userId && loginPassword === storedUserData.password) {
      navigate('/profile', { state: { nickname: storedUserData.nickname || 'User' } });
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="mypage-container">
      {view === 'landing' && (
        <div className="mypage-content">
          <div className="header">
            <h2>마이페이지</h2>
          </div>
          <p>로그인하고 다양한 서비스를 경험해보세요.</p>
          <button onClick={handleLoginClick}>로그인</button>
          <button onClick={handleSignUpClick}>회원가입</button>
        </div>
      )}

      {view === 'login' && (
        <div className="login-form">
          <h2>로그인</h2>
          <input 
            placeholder="아이디" 
            value={loginUserId} 
            onChange={(e) => setLoginUserId(e.target.value)} 
          />
          <input 
            placeholder="비밀번호" 
            type="password" 
            value={loginPassword} 
            onChange={(e) => setLoginPassword(e.target.value)} 
          />
          <button onClick={handleLogin}>Login</button>
          <div className="link-text">
            <span onClick={handlePasswordResetClick}>비밀번호를 잊어버리셨나요?</span>
          </div>
          <div className="link-text">
            계정이 없으신가요? <span onClick={() => setView('signup')}>sign up</span>
          </div>
        </div>
      )}

      {view === 'signup' && (
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
      )}

      {view === 'resetPassword' && (
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
      )}

      {view === 'success' && (
        <div className="success-message">
          <h2>{`회원가입\n성공!`}</h2>
          <div className="button-group">
            <button onClick={handleLoginClick}>로그인 하러 가기</button>
            <button onClick={handleBackToHome}>홈으로 돌아가기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;


















