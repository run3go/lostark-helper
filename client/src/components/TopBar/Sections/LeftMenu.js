import React, { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./topbar.module.scss";

const LeftMenu = forwardRef((props, ref) => {
  const [toggleSnb, setToggleSnb] = useState(false);

  const closeSideNavBar = () => {
    setToggleSnb(false);
    console.log("close");
    ref.current.style.width = "0";
  };

  const openSideNavBar = () => {
    setToggleSnb(true);
    console.log("open");
    ref.current.style.width = "18%";
  };
  return (
    <div className={styles["header__nav"]}>
      <button
        onClick={toggleSnb ? closeSideNavBar : openSideNavBar}
        className={`${styles["header__nav__link"]} ${styles["header__nav__link--background-none"]}`}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link className={styles["header__nav__link"]} to="/">
        Lostark Helper
      </Link>
      <Link className={styles["header__nav__link"]} to="/">
        main2
      </Link>
    </div>
  );
});

export default LeftMenu;
