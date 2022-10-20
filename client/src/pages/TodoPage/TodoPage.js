import React, { useState } from "react";
import styles from "./TodoPage.module.scss";
import CustomPopup from "../../components/CustomPopup/CustomPopup";

function TodoPage() {
  //Pagination 상태, 변수

  const [visibility, setVisibility] = useState(false);

  const userId = localStorage.getItem("userId");

  //팝업 열고 닫는 함수
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  return (
    <div id={styles.container}>
      <button onClick={() => setVisibility(!visibility)}>
        대표 캐릭터 가져오기
      </button>
      <CustomPopup onClose={popupCloseHandler} show={visibility} />
    </div>
  );
}

export default TodoPage;
