import React from "react";
import { Link } from "react-router-dom";

function RightMenu() {
  return (
    <div className="menu_right">
      <Link className="text_link menu_item" to="/login">
        Sign in
      </Link>
      <Link className="text_link menu_item" to="/register">
        Sign up
      </Link>
    </div>
  );
}

export default RightMenu;
