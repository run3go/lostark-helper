import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../_reducers/userSlice";
import styles from "./topbar.module.scss";

function RightMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        localStorage.removeItem("userId");
        navigate("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div className={styles["header__nav"]}>
        <Link className={styles["header__nav__link"]} to="/login">
          Signin
        </Link>
        <Link className={styles["header__nav__link"]} to="/register">
          Signup
        </Link>
      </div>
    );
  } else {
    return (
      <div className={styles["header__nav"]}>
        <Link
          onClick={logoutHandler}
          className={styles["header__nav__link"]}
          to="/"
        >
          Logout
        </Link>
      </div>
    );
  }
}

export default RightMenu;
