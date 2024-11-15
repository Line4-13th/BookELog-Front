// src/pages/Home/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'; // For Login.jsx

const Login = ({ setView }) => {
  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData && loginUserId === storedUserData.userId && loginPassword === storedUserData.password) {
      navigate('/profile', { state: { nickname: storedUserData.nickname || 'User' } });
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
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
        <span onClick={() => setView('resetPassword')}>비밀번호를 잊어버리셨나요?</span>
      </div>
      <div className="link-text">
        계정이 없으신가요? <span onClick={() => setView('signup')}>sign up</span>
      </div>
    </div>
  );
};

export default Login;
