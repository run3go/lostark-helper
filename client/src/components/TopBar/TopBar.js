import React, { forwardRef } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import styles from "./Sections/topbar.module.scss";

const TopBar = forwardRef((props, ref) => {
  return (
    <div className={styles.header}>
      <LeftMenu ref={ref} />
      <RightMenu />
    </div>
  );
});

export default TopBar;
