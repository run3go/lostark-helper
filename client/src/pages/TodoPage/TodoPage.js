import React, { useEffect, useState } from "react";
import styles from "./TodoPage.module.scss";
import axios from "axios";
import { CHARACTER_SERVER } from "../../components/Config";
import CustomPopup from "../../components/CustomPopup/CustomPopup";

function TodoPage() {
  const [visibility, setVisibility] = useState(false);
  const [hasData, setHasData] = useState(false);

  const [charactersInfo, setCharactersInfo] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const getData = async () => {
      let dataToSubmit = { userId };
      const response = await axios.post(
        `${CHARACTER_SERVER}/getCharactersInfo`,
        dataToSubmit
      );
      if (hasData && response.data.success) {
        setCharactersInfo(response.data.info);
      }
      if (!hasData && response.data.success) {
        setHasData(true);
        setCharactersInfo(response.data.info);
      }
    };
    getData();
  }, [hasData]);
  //팝업 열고 닫는 함수
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  if (!hasData) {
    return (
      <div className={styles["container"]}>
        <CustomPopup
          onClose={popupCloseHandler}
          show={visibility}
          setHasData={setHasData}
        />
        <button
          className={`${styles["get-data-btn"]} ${styles["standby"]}`}
          onClick={() => setVisibility(!visibility)}
        >
          대표 캐릭터 가져오기
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles["container"]}>
        <CustomPopup onClose={popupCloseHandler} show={visibility} />
        <button
          className={styles["get-data-btn"]}
          onClick={() => setVisibility(!visibility)}
        >
          대표 캐릭터 가져오기
        </button>
        <div
          className={`${styles["today-content"]} ${styles["todo-contents"]}`}
        >
          <h1 className={styles["todo-contents__title"]}>Today</h1>
        </div>
        <div className={`${styles["week-content"]} ${styles["todo-contents"]}`}>
          <h1 className={styles["todo-contents__title"]}>This Week</h1>
        </div>
        <div
          className={`${styles["region-content"]} ${styles["todo-contents"]}`}
        >
          <h1 className={styles["todo-contents__title"]}>군단장</h1>
          <ul className={styles["region-content__list"]}>
            {charactersInfo.map((info, i) => (
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
}

export default TodoPage;
