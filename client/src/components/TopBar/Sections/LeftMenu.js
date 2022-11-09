import React, { useState, forwardRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./topbar.module.scss";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { getCharacters } from "../../../slices/charactersSlice";

const LeftMenu = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [toggleSnb, setToggleSnb] = useState(false);
  const [toggleDisabled, setToggleDisabled] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const dataToSubmit = { userId };
    console.log("left Menu");
    dispatch(getCharacters(dataToSubmit)).then((res) => {
      if (!res.payload.success) {
        setToggleDisabled(true);
      }
    });
  }, [dispatch]);

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
        onClick={
          toggleDisabled ? null : toggleSnb ? closeSideNavBar : openSideNavBar
        }
        className={`${styles["header__nav__link"]} ${styles["header__nav__link--background-none"]}`}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <Link
        className={styles["header__nav__link"]}
        to={toggleDisabled ? "#" : "/todo/main"}
      >
        Lostark Helper
      </Link>
      <Link className={styles["header__nav__link"]} to="/">
        main2
      </Link>
    </div>
  );
});

export default LeftMenu;
