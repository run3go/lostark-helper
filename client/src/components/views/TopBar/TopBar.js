import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import "./Sections/topbar.scss";

function TopBar() {
  return (
    <div className="menu">
      <LeftMenu />
      <RightMenu />
    </div>
  );
}

export default TopBar;
