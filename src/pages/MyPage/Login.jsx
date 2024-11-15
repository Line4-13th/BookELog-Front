// src/pages/Home/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios 추가
import "./Login.scss"; // For Login.jsx
import BASE_URL from "../../../API_URL"; // API URL

const Login = ({ setView }) => {
  const [loginUserId, setLoginUserId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginUserId || !loginPassword) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/mypage/login/`, {
        username: loginUserId,
        password: loginPassword,
      });

      console.log("로그인 성공:", response.data);

      // 로그인 성공 후 사용자 데이터를 저장하거나 필요한 처리를 수행
      localStorage.setItem("userToken", response.data.token); // 예시로 토큰 저장

      // 사용자 프로필로 이동 (닉네임은 API 응답으로 제공된다고 가정)
      navigate("/profile", {
        state: { nickname: response.data.nickname || "User" },
      });
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
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
        <span onClick={() => setView("resetPassword")}>
          비밀번호를 잊어버리셨나요?
        </span>
      </div>
      <div className="link-text">
        계정이 없으신가요?{" "}
        <span onClick={() => setView("signup")}>sign up</span>
      </div>
    </div>
  );
};

export default Login;
