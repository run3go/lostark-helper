import React, { useState } from "react";
import styles from "./TodoPage.module.scss";
import CustomPopup from "../../components/CustomPopup/CustomPopup";

function TodoPage() {
  const [visibility, setVisibility] = useState(false);

  //팝업 열고 닫는 함수
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };
  return (
    <div className={styles["container"]}>
      <CustomPopup onClose={popupCloseHandler} show={visibility} />
      <button
        className={`${styles["get-data-btn"]} ${styles["standby"]}`}
        onClick={() => setVisibility(!visibility)}
      >
        대표 캐릭터 가져오기
      </button>
    </div>
  );
}

export default TodoPage;
