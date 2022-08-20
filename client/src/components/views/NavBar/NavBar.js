import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import "./Sections/Navbar.scss";

function NavBar() {
  return (
    <div className="menu">
      <LeftMenu />
      <RightMenu />
    </div>
  );
}

export default NavBar;
