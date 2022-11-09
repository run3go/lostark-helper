import React, { useEffect, useState } from "react";
import styles from "./TodayPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
function TodayPage() {
  const characters = useSelector((state) => state.characters.info);
  const dispatch = useDispatch();
  return <div className={styles["container"]}></div>;
}

export default TodayPage;
