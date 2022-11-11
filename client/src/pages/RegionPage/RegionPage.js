import React from "react";
import { useSelector } from "react-redux";
import styles from "./RegionPage.module.scss";

function RegionPage() {
  const characters = useSelector((state) => state.characters);
  if (characters.loading) {
    return (
      <div className={styles["lds-spinner"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["todo-contents"]}>
        <h1 className={styles["todo-contents__title"]}>군단장</h1>
      </div>
    </div>
  );
}

export default RegionPage;
