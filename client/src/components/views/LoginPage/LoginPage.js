import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
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
        navigate("/");
      } else {
        alert("로그인에 실패했습니다.");
        setPassword("");
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form_box}>
        <div className={styles.input_box}>
          <span
            className={`${styles.input_txt} ${Email ? styles.focus_out : null}`}
          >
            이메일
          </span>
          <input
            className={styles.input_field}
            id="email"
            type="email"
            value={Email}
            onChange={onChangeEmail}
          />
        </div>

        <div className={styles.input_box}>
          <span
            className={`${styles.input_txt} ${
              Password ? styles.focus_out : null
            }`}
          >
            비밀번호
          </span>
          <input
            className={styles.input_field}
            id="password"
            type="password"
            value={Password}
            onChange={onChangePassword}
          />
        </div>

        <button
          className={styles.button_submit}
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
