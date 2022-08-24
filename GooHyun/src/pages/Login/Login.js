import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

function Login() {
  // main page 로 이동하기 위한 navigate
  const navigate = useNavigate();
  // id, pw input state
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  // loginButton 색상 state
  const [color, setColor] = useState("rgb(133, 182, 231)");
  // loginButton 활성화 비활성화 state
  const [isDisabled, setDisabled] = useState(true);

  // main page 로 이동하는 함수
  const goToMain = () => {
    navigate("/main");
  };

  // onClick 이벤트 발생시 idInput 값 최신화
  const handelIdInput = (e) => {
    setIdInput(e.target.value);
  };

  // onClick 이벤트 발생시 pwInput 값 최신화
  const handlePwInput = (e) => {
    setPwInput(e.target.value);
  };

  // id, pw 유효성 검사
  function pushValue() {
    switch (!(idInput && pwInput)) {
      case false: // inpuID, inpuPW 에 값이 있는 경우
        switch (!(idInput.includes("@") && pwInput.length >= 5)) {
          case false: // id "@" 포함시 && pw 5글자 이상이면 loginButton 활성화
            setDisabled(false);
            setColor("rgb(29, 142, 255)");
            break;
          default: // id "@" 미포함시 && pw 5글자 미만이면 loginButton 비활성화
            setDisabled(true);
            setColor("rgb(133, 182, 231)");
            break;
        }
        break;
      default: // inpuID, inpuPW 에 값이 없는 경우 loginButton 비활성화
        setDisabled(true);
        setColor("rgb(133, 182, 231)");
        break;
    }
  }

  // Login API
  const onLoginButtonClick = () => {
    const body = {
      email: id,
      password: password,
    };
    fetch("api주소", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        setToken(json.access_token);
        localStorage.setItem("token", json.access_token);
      });
  };

  return (
    <React.Fragment>
      <div className="flex-center container">
        <div className="login-container">
          <div className="logo-wrapper flex-center">
            <span className="logo-text">Justgram</span>
          </div>
          <div className="form-wrapper">
            <form id="login-form">
              <div className="flex-center login-wrapper">
                <input
                  id="id-input"
                  className="login-input"
                  type="text"
                  placeholder="전화번호, 사용자 이름 또는 이메일"
                  value={idInput}
                  onChange={handelIdInput}
                  onKeyUp={pushValue}
                />
              </div>
              <div className="flex-center login-wrapper">
                <input
                  id="pw-input"
                  className="login-input"
                  type="password"
                  placeholder="비밀번호"
                  value={pwInput}
                  onChange={handlePwInput}
                  onKeyUp={pushValue}
                />
              </div>
              <div className="flex-center button-wrapper">
                <button
                  id="login-btn"
                  className="login-button"
                  type="submit"
                  disabled={isDisabled}
                  style={{ backgroundColor: color }}
                  onClick={goToMain}
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
          <div className="flex-center extra-wrapper">
            <a className="find-password" href="{() => false}">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
