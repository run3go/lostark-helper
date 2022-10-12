import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";

const SideBar = React.forwardRef((props, ref) => {
  return (
    <div className={styles.snb} ref={ref}>
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
});

export default SideBar;
