import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../slices/charactersSlice";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <div
        onClick={() => navigate("/todo/region")}
        className={`${styles["region-content"]} ${styles["todo-contents"]}`}
      >
        <h1 className={styles["todo-contents__title"]}>군단장</h1>
        <ul className={styles["region-content__list"]}>
          {isFetched &&
            characters.info.character.map((character, i) => (
              <li key={i} className={styles["region-content__item"]}>
                <span
                  className={
                    character.regionRaid.filter((region) => {
                      return region.clear === true;
                    }).length === 3
                      ? styles["region-content__item__name--font-bold"]
                      : styles["region-content__item__name"]
                  }
                >
                  {character.name}
                </span>
                <ul className={styles["region-content__item__raid-list"]}>
                  {character.regionRaid.map((raid) => {
                    return (
                      <li
                        key={raid.id}
                        className={
                          raid.clear
                            ? styles[
                                "region-content__item__raid-item--font-bold"
                              ]
                            : styles["region-content__item__raid-item"]
                        }
                      >
                        <span
                          className={
                            styles[
                              "region-content__item__raid-item__region-name"
                            ]
                          }
                        >
                          {raid.region}
                        </span>
                        <span
                          className={
                            styles[
                              "region-content__item__raid-item__region-clear"
                            ]
                          }
                        >
                          {raid.clear ? "1/1" : "0/1"}
                        </span>
                      </li>
                    );
                  })}
                </ul>
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
