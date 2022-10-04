import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function LeftMenu() {
  return (
    <div className="menu_left">
      <Link className="text_link menu_item" to="/">
        <FontAwesomeIcon icon={faBars} />
      </Link>
      <Link className="menu_item text_link" to="/">
        Lostark Helper
      </Link>
      <Link className="text_link menu_item" to="/">
        main2
      </Link>
    </div>
  );
}

export default LeftMenu;
