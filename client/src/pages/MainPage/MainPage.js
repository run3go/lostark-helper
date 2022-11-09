import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../slices/charactersSlice";

function MainPage() {
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
      <div className={`${styles["today-content"]} ${styles["todo-contents"]}`}>
        <h1 className={styles["todo-contents__title"]}>Today</h1>
      </div>
      <div className={`${styles["week-content"]} ${styles["todo-contents"]}`}>
        <h1 className={styles["todo-contents__title"]}>This Week</h1>
      </div>
      <div className={`${styles["region-content"]} ${styles["todo-contents"]}`}>
        <h1 className={styles["todo-contents__title"]}>군단장</h1>
        <ul className={styles["region-content__list"]}>
          {isFetched &&
            characters.info.data.map((info, i) => (
              <li key={i} className={styles["region-content__item"]}>
                <span className={styles["region-content__item__name"]}>
                  {info.name}
                </span>
              </li>
            ))}
        </ul>
      </div>
      <div
        className={`${styles["custom-todo-content"]} ${styles["todo-contents"]}`}
      >
        <h1 className={styles["todo-contents__title"]}>오늘 숙제</h1>
      </div>
    </div>
  );
}
export default MainPage;
