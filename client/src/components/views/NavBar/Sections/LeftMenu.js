import React from "react";
import { Link } from "react-router-dom";

function LeftMenu() {
  return (
    <div className="menu_left">
      <Link className="text_link" to="/">
        <div className="menu_logo"> Logo </div>
      </Link>
      <Link className="text_link menu_item" to="/">
        Main1
      </Link>
      <Link className="text_link menu_item" to="/">
        Main2
      </Link>
    </div>
  );
}

export default LeftMenu;
