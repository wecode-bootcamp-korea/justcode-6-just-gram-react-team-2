import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleIdInput = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    idValue.includes("@") && password.length >= 5
      ? setIsValid(true)
      : setIsValid(false);
  };

  const handlePwdInput = (e) => {
    const pwdValue = e.target.value;
    setPassword(pwdValue);
    id.includes("@") && pwdValue.length >= 5
      ? setIsValid(true)
      : setIsValid(false);
  };

  const goMain = () => {
    navigate("/main");
  };

  return (
    <div className="out-login">
      <div className="main">
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />
        <h1 className="loginTitle">instagram</h1>
        <div className="container">
          <div className="usernameBox">
            <input
              id="id-input"
              type="text"
              placeholder="전화번호, 사용자 이름 또는 이메일"
              onChange={handleIdInput}
            />
          </div>
          <div className="passwordBox">
            <input
              id="pw-input"
              placeholder="비밀번호"
              onChange={handlePwdInput}
            />
          </div>

          <button
            style={{ backgroundColor: isValid ? "#4ec5f4" : "cde9f4" }}
            id="btn"
            type="submit"
          >
            로그인
          </button>

          <div className="bottomText cursorChange">
            <span onClick={goMain}>비밀번호를 잊으셨나요?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
