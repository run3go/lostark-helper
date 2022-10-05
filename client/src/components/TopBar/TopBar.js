import React from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import styles from "./Sections/topbar.module.scss";

function TopBar() {
  return (
    <div className={styles.menu}>
      <LeftMenu />
      <RightMenu />
    </div>
  );
}

export default TopBar;
