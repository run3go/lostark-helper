import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../_reducers/userSlice";
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
        navigate("/");
      } else {
        alert("로그인에 실패했습니다.");
        setPassword("");
      }
    });
  };

  return (
    <div className={styles["container"]}>
      <h1>Login</h1>
      <form className={styles["register-form"]}>
        <div className={styles["register-form__input-box"]}>
          <span
            className={`${styles["register-form__text"]} ${
              Email ? styles["register-form__text--focus-out"] : null
            }`}
          >
            이메일
          </span>
          <input
            className={styles["register-form__input-field"]}
            id="email"
            type="email"
            value={Email}
            onChange={onChangeEmail}
          />
        </div>

        <div className={styles["register-form__input-box"]}>
          <span
            className={`${styles["register-form__text"]} ${
              Password ? styles["register-form__text--focus-out"] : null
            }`}
          >
            비밀번호
          </span>
          <input
            className={styles["register-form__input-field"]}
            id="password"
            type="password"
            value={Password}
            onChange={onChangePassword}
          />
        </div>

        <button
          className={styles["register-form__submit-button"]}
          onClick={handleSubmit}
          disabled={!(Email && Password)}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
