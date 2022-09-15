import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_SERVER } from "../../../Config";

function RightMenu() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };
  const user = useSelector((state) => state.user);
  if (user.userData && !user.userData.isAuth) {
    return (
      <div className="menu_right">
        <Link className="text_link menu_item" to="/login">
          Signin
        </Link>
        <Link className="text_link menu_item" to="/register">
          Signup
        </Link>
      </div>
    );
  } else {
    return (
      <div className="menu_right">
        <Link onClick={logoutHandler} className="text_link menu_item" to="/">
          Logout
        </Link>
      </div>
    );
  }
}

export default RightMenu;
