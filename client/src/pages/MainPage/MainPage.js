import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../slices/charactersSlice";
//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
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
  if (isFetched) {
    return (
      <div className={styles["container"]}>
        <div
          onClick={() => navigate("/todo/today")}
          className={`${styles["today-content"]} ${styles["todo-contents"]}`}
        >
          <h1 className={styles["todo-contents__title"]}>Today</h1>
        </div>

        <div
          onClick={() => navigate("/todo/region")}
          className={`${styles["region-content"]} ${styles["todo-contents"]}`}
        >
          <h1 className={styles["todo-contents__title"]}>군단장</h1>
          <ul className={styles["todo-contents__list"]}>
            {characters.info.character.map((el, index) => (
              <li key={index} className={styles["todo-contents__item"]}>
                <span
                  className={
                    el.regionRaid.filter((elem) => {
                      return elem.clear === true;
                    }).length === el.regionRaid.length
                      ? styles["region-content__item__name--font-bold"]
                      : styles["region-content__item__name"]
                  }
                >
                  {el.name}
                </span>
                <ul className={styles["region-content__item__raid-list"]}>
                  {el.regionRaid.map((raid) => {
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
          onClick={() => navigate("/todo/week")}
          className={`${styles["week-content"]} ${styles["todo-contents"]}`}
        >
          <h1 className={styles["todo-contents__title"]}>This Week</h1>
          <div className={styles["week-content-wrap"]}>
            <ul className={styles["todo-contents__list"]}>
              <li className={styles["todo-contents__item"]}>
                <ul className={styles["week-content__todo-list"]}>
                  <li className={styles["week-content__todo-item"]} />
                  {characters.info.character[0].weeklyCharTodo.map(
                    (el, index) => (
                      <li
                        key={index}
                        className={styles["week-content__todo-item"]}
                      >
                        {el.todo}
                      </li>
                    )
                  )}
                </ul>
              </li>
              {characters.info.character.map((el, index) => (
                <li key={index} className={styles["todo-contents__item"]}>
                  <span
                    className={
                      el.weeklyCharTodo.filter((elem) => {
                        return elem.clear === true;
                      }).length === el.weeklyCharTodo.length
                        ? styles["todo-contents__item__name--font-bold"]
                        : styles["todo-contents__item__name"]
                    }
                  >
                    {el.name}
                  </span>
                  <ul className={styles["week-content__clear-list"]}>
                    {el.weeklyCharTodo.map((elem, i) => (
                      <li
                        key={i}
                        className={styles["week-content__clear-item"]}
                      >
                        {elem.disabled ? (
                          <FontAwesomeIcon
                            className={
                              styles["week-content__clear-item__xmark-icon"]
                            }
                            icon={faBan}
                          />
                        ) : elem.clear ? (
                          <FontAwesomeIcon
                            className={
                              styles["week-content__clear-item__check-icon"]
                            }
                            icon={faCheck}
                          />
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <ul className={styles["week-content__exp-list"]}>
              {user.userData.weeklyExpTodo.map((el, index) => (
                <li className={styles["week-content__exp-item"]} key={index}>
                  <span
                    className={
                      el.clear
                        ? styles["week-content__exp-item__todo-name--clear"]
                        : styles["week-content__exp-item__todo-name"]
                    }
                  >
                    {el.todo}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
