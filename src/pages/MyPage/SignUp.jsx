
/// src/pages/Home/SignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../../../API_URL';
import './SignUp.scss'; // For SignUp.jsx


const SignUp = ({ setView }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");


  const handleSignUp = async () => {
    // Basic validation

    if (!userId || !password || !confirmPassword || !nickname || !email) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // Send POST request to the signup endpoint
      const response = await axios.post(`${API_URL}/api/mypage/signup/`, {
        username: userId,
        email: email,
        password: password,
        first_name: nickname,
      });

      // Check if signup was successful
      if (response.data.message === '회원가입 완료') {
        alert('회원가입이 완료되었습니다.');
        setView('success'); // Show success message
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        alert(`회원가입 실패: ${error.response.data.message || '요청에 실패했습니다.'}`);
      } else {
        alert('서버와의 연결에 문제가 있습니다.');
      }
    }
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
      <button onClick={handleSignUp}>Sign up</button>
      <div className="link-text">
        이미 계정이 있으신가요?{" "}
        <span onClick={() => setView("login")}>Login</span>
      </div>
    </div>
  );
};

export default SignUp;

