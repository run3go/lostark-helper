import React from "react";
import { Link } from "react-router-dom";

function RightMenu() {
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
}

export default RightMenu;
