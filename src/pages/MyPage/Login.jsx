// src/pages/Home/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../../API_URL';
import './Login.scss';

function Login({ setView }) {
  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loginUserId.trim() === '' || loginPassword.trim() === '') {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      // Send the POST request to the login endpoint
      const response = await axios.post(`${API_URL}/api/mypage/login/`, {
        username: loginUserId,
        password: loginPassword,
      });

      if (response.data.message === '로그인 성공') {
        const storedUserData = {
          userId: loginUserId,
          nickname: response.data.nickname || 'User', // Use nickname from response or default to 'User'
        };

        // Store user data in localStorage for session persistence
        localStorage.setItem('userData', JSON.stringify(storedUserData));

        // Redirect to ProfilePage with nickname state
        navigate('/profile', { state: { nickname: storedUserData.nickname } });
      } else {
        alert(response.data.message || '아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      if (error.response) {
        alert(`로그인 실패: ${error.response.data.message || '요청에 실패했습니다.'}`);
      } else {
        alert('서버와의 연결에 문제가 있습니다.');
      }
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
        계정이 없으신가요? <span onClick={() => setView('signup')}>회원가입</span>
      </div>
    </div>
  );
}

export default Login;



