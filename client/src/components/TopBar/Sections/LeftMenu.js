import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./topbar.module.scss";

function LeftMenu() {
  return (
    <div className={styles.header_left}>
      <Link className={`${styles.nav_btn}`} to="/">
        <FontAwesomeIcon icon={faBars} />
      </Link>
      <Link className={`${styles.nav_btn}`} to="/">
        Lostark Helper
      </Link>
      <Link className={`${styles.nav_btn}`} to="/">
        main2
      </Link>
    </div>
  );
}

export default LeftMenu;
