import React, { useState, forwardRef } from "react";
import styles from "./topbar.module.scss";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const LeftMenu = forwardRef((props, ref) => {
  const [toggleSnb, setToggleSnb] = useState(false);

  const closeSideNavBar = () => {
    setToggleSnb(false);
    ref.current.style.width = "0";
  };

  const openSideNavBar = () => {
    setToggleSnb(true);
    ref.current.style.width = "25%";
  };
  return (
    <div className={styles["header__nav"]}>
      <button
        onClick={toggleSnb ? closeSideNavBar : openSideNavBar}
        className={`${styles["header__nav__link"]} ${styles["header__nav__link--background-none"]}`}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link className={styles["header__nav__link"]} to={"/todo/main"}>
        Lostark Helper
      </Link>
      <Link className={styles["header__nav__link"]} to="/">
        main2
      </Link>
    </div>
  );
});

export default LeftMenu;
