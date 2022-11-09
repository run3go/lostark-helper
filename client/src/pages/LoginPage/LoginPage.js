import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCharacters } from "../../slices/charactersSlice";
import { loginUser } from "../../slices/userSlice";
import styles from "./LoginPage.module.scss";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let dataToSubmit = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(dataToSubmit)).then((response) => {
      if (response.payload.loginSuccess) {
        localStorage.setItem("userId", response.payload.userId);
        const userId = localStorage.getItem("userId");
        dataToSubmit = {
          userId,
        };
        dispatch(getCharacters(dataToSubmit)).then((response) => {
          if (response.payload.data) {
            navigate("/todo/main");
          } else {
            navigate("/");
          }
        });
      } else {
        alert("로그인에 실패했습니다.");
        setPassword("");
      }
    });
  };

  return (
    <div className={styles["overlay"]}>
      <div className={styles["container"]}>
        <h1>Login</h1>
        <form className={styles["login-form"]}>
          <div className={styles["login-form__input-box"]}>
            <span
              className={`${styles["login-form__text"]} ${
                Email ? styles["login-form__text--focus-out"] : null
              }`}
            >
              이메일
            </span>
            <input
              className={styles["login-form__input-field"]}
              id="email"
              type="email"
              autoComplete="off"
              value={Email}
              onChange={onChangeEmail}
            />
          </div>

          <div className={styles["login-form__input-box"]}>
            <span
              className={`${styles["login-form__text"]} ${
                Password ? styles["login-form__text--focus-out"] : null
              }`}
            >
              비밀번호
            </span>
            <input
              className={styles["login-form__input-field"]}
              id="password"
              type="password"
              autoComplete="new-password"
              value={Password}
              onChange={onChangePassword}
            />
          </div>

          <button
            className={styles["login-form__submit-button"]}
            onClick={handleSubmit}
            disabled={!(Email && Password)}
          >
            Sign In
          </button>
        </form>
        <Link className={styles["link-btn"]} to="/register">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
