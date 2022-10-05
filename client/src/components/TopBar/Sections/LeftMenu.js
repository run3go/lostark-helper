import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./topbar.module.scss";

function LeftMenu() {
  return (
    <div className={styles.menu_left}>
      <Link className={`${styles.text_link} ${styles.menu_item}`} to="/">
        <FontAwesomeIcon icon={faBars} />
      </Link>
      <Link className={`${styles.text_link} ${styles.menu_item}`} to="/">
        Lostark Helper
      </Link>
      <Link className={`${styles.text_link} ${styles.menu_item}`} to="/">
        main2
      </Link>
    </div>
  );
}

export default LeftMenu;
