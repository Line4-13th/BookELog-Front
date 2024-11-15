import React, { useState } from "react";
import axios from "axios"; // Axios 임포트
import "./SignUp.scss"; // For SignUp.jsx
import BASE_URL from "../../../API_URL";

const SignUp = ({ setView }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const handleSuccessfulSignUp = async () => {
    if (!userId || !password || !confirmPassword || !nickname || !email) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const payload = {
        username: userId,
        email: email,
        password: password,
        first_name: nickname,
      };

      const response = await axios.post(
        `${BASE_URL}api/mypage/signup/`,
        payload
      );

      if (response.status === 201) {
        alert("회원가입에 성공했습니다.");
        setView("success");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      if (error.response && error.response.data) {
        alert(
          `오류: ${error.response.data.detail || "회원가입에 실패했습니다."}`
        );
      } else {
        alert("회원가입 요청 중 오류가 발생했습니다.");
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
      <button onClick={handleSuccessfulSignUp}>Sign up</button>
      <div className="link-text">
        이미 계정이 있으신가요?{" "}
        <span onClick={() => setView("login")}>Login</span>
      </div>
    </div>
  );
};

export default SignUp;
