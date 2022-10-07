import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.scss";

function SideBar() {
  const sideNavBar = useRef();
  const navigate = useNavigate();
  return (
    <div className={styles.snb} ref={sideNavBar}>
      <ul className={styles.snb_list}>
        <li className={styles.snb_menu}>
          <Link to={"/"}>
            <span>전체 보기</span>
          </Link>
        </li>
        <li className={styles.snb_menu}>
          <Link to={"/"}>
            <span>오늘</span>
          </Link>
        </li>
        <li className={styles.snb_menu}>
          <Link to={"/"}>
            <span>이번 주</span>
          </Link>
        </li>
        <li className={styles.snb_menu}>
          <Link to={"/"}>
            <span>군단장</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
