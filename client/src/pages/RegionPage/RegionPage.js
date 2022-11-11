import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../slices/charactersSlice";
import styles from "./RegionPage.module.scss";

function RegionPage() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const dataToSubmit = { userId };
    dispatch(getCharacters(dataToSubmit)).then((res) => {
      setIsFetched(true);
    });
  }, [dispatch]);

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
      <div
        className={`${styles["todo-contents"]} ${styles["total-clear-box"]}`}
      >
        <h1 className={styles["todo-contents__title"]}>총합</h1>
      </div>
      <div className={`${styles["todo-contents"]} ${styles["region-box"]}`}>
        <h1 className={styles["todo-contents__title"]}>군단장</h1>
      </div>
      <ul className={styles["character-wrap"]}>
        {isFetched &&
          characters.info.data.map((character, i) => (
            <li
              key={i}
              className={`${styles["character-box"]} ${styles["todo-contents"]}`}
            >
              <h1 className={styles["todo-contents__title"]}>
                {character.name}
              </h1>
              <ul className={styles["character-box__raid-list"]}>
                {character.regionRaid.map((raid, i) => {
                  return (
                    <li key={i} className={styles["character-box__raid-item"]}>
                      <span
                        className={
                          styles["character-box__raid-item__region-name"]
                        }
                      >
                        {raid.region}
                      </span>
                      <span
                        className={
                          styles["character-box__raid-item__clear-number"]
                        }
                      >
                        {raid.clear ? "클리어" : "0/1"}{" "}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default RegionPage;
