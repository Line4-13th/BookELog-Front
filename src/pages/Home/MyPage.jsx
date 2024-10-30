// src/pages/MyPage.jsx
import React, { useState } from 'react';

const MyPage = () => {
  const [isMember, setIsMember] = useState(false); // Checks if the user is a member
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Checks if the user is logged in
  const [showSignUpSuccess, setShowSignUpSuccess] = useState(false); // Track signup success

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    setIsMember(true);
    setShowSignUpSuccess(true);
  };

  const renderContent = () => {
    if (isLoggedIn) {
      return <div>My Page Content for Logged-In User</div>;
    } else if (showSignUpSuccess) {
      return <div>회원가입 성공!</div>; // Sign-up success screen
    } else if (!isMember) {
      return (
        <div>
          <h2>회원가입</h2>
          <input placeholder="아이디" />
          <input placeholder="비밀번호" type="password" />
          <input placeholder="비밀번호 확인" type="password" />
          <input placeholder="별명" />
          <input placeholder="Email" />
          <button onClick={handleSignUp}>Sign up</button>
        </div>
      );
    } else {
      return (
        <div>
          <h2>로그인</h2>
          <input placeholder="아이디" />
          <input placeholder="비밀번호" type="password" />
          <button onClick={handleLogin}>Login</button>
          <div>
            계정이 없으신가요? <span onClick={() => setIsMember(false)}>Sign up</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="mypage-screen">
      {renderContent()}
    </div>
  );
};

export default MyPage;
