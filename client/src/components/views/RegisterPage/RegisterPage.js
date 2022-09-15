import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { registerUser } from "../../../_actions/user_actions";
import { USER_SERVER } from "../../Config";
import styles from "./RegisterPage.module.scss";
import axios from "axios";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");

  const [EmailMessage, setEmailMessage] = useState("");
  const [PasswordMessage, setPasswordMessage] = useState("");
  const [PasswordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [IsEmail, setIsEmail] = useState(false);
  const [IsPassword, setIsPassword] = useState(false);
  const [IsPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const [CheckEmail, setCheckEmail] = useState(false);

  const onChangeEmail = (event) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{3,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = event.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요");
      setIsEmail(true);
    }
  };

  const onChangePassword = (event) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,25}$/;
    const passwordCurrent = event.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "숫자/영문자/특수문자를 조합해 7자리 이상 입력해주세요"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요");
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (event) => {
    const passwordConfirmCurrent = event.target.value;
    setPasswordConfirm(passwordConfirmCurrent);

    if (passwordConfirmCurrent !== Password) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않아요");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치해요");
      setIsPasswordConfirm(true);
    }
  };

  const checkRequirement = (req, value) => {
    if (!value) {
      return;
    }

    if (req) {
      return <FaCheckCircle className={`${styles.checked} ${styles.icon}`} />;
    } else {
      return <FaTimesCircle className={`${styles.unchecked} ${styles.icon}`} />;
    }
  };

  const handleCheckEmail = (event) => {
    event.preventDefault();

    let dataToCheck = {
      email: Email,
    };

    axios.post(`${USER_SERVER}/checkEmail`, dataToCheck).then((response) => {
      if (response.data.success) {
        alert(response.data.message);
        setCheckEmail(true);
      } else {
        alert(response.data.message);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let dataToSubmit = {
      email: Email,
      password: Password,
    };

    dispatch(registerUser(dataToSubmit)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    });
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
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
          {checkRequirement(IsEmail, Email)}
          <span
            className={`${styles.req_msg} ${
              IsEmail ? styles.success : styles.false
            }`}
          >
            {EmailMessage}
          </span>
          <button
            className={styles.checkEmail_button}
            onClick={handleCheckEmail}
            disabled={!IsEmail}
          >
            중복확인
          </button>
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
          {checkRequirement(IsPassword, Password)}
          <span
            className={`${styles.req_msg} ${
              IsPassword ? styles.success : styles.false
            }`}
          >
            {PasswordMessage}
          </span>
        </div>

        <div className={styles.input_box}>
          <span
            className={`${styles.input_txt} ${
              PasswordConfirm ? styles.focus_out : null
            }`}
          >
            비밀번호 확인
          </span>
          <input
            className={styles.input_field}
            id="passwordConfirm"
            type="password"
            value={PasswordConfirm}
            onChange={onChangePasswordConfirm}
          />
          {checkRequirement(IsPasswordConfirm, PasswordConfirm)}
          <span
            className={`${styles.req_msg} ${
              IsPasswordConfirm ? styles.success : styles.false
            }`}
          >
            {PasswordConfirmMessage}
          </span>
        </div>

        <button
          className={styles.button_submit}
          onClick={handleSubmit}
          disabled={!(IsEmail && IsPassword && IsPasswordConfirm && CheckEmail)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
