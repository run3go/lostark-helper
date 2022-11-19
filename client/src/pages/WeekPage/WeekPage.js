import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../../slices/charactersSlice";
import styles from "./WeekPage.module.scss";

// 원정대 : 도전 가디언 토벌, 도전 어비스 던전,
// 캐릭터 : 어비스 레이드, 어비스 던전,
// 커스텀 : 혈석 교환, 해적 주화 상점, 레이드 표식 교환, 카양겔 교환,

function WeekPage() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);
  const userId = localStorage.getItem("userId");

  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    const dataToSubmit = { userId };
    dispatch(getCharacters(dataToSubmit)).then((res) => {
      setIsFetched(true);
    });
  }, [dispatch, userId]);

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
      <div className={`${styles["todo-contents"]} ${styles["expedition-box"]}`}>
        <h1 className={styles["todo-contents__title"]}>캐릭터</h1>
      </div>
      <div className={`${styles["todo-contents"]} ${styles["character-box"]}`}>
        <h1 className={styles["todo-contents__title"]}>원정대</h1>
      </div>
    </div>
  );
}

export default WeekPage;
