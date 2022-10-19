import axios from "axios";
import React, { useState } from "react";
import styles from "./TodoPage.module.scss";
import { CHARACTER_SERVER } from "../../components/Config";
import CustomPopup from "../../components/CustomPopup/CustomPopup";
import Pagination from "../../components/Pagination/Pagination";

function TodoPage() {
  //Pagination 상태, 변수
  const [showPageNum, setShowPageNum] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 9;
  const offset = (page - 1) * limit;

  const [visibility, setVisibility] = useState(false);
  const [character, setCharacter] = useState("");
  const [charactersInfo, setCharactersInfo] = useState([]);
  const characterArray = [];

  const userId = localStorage.getItem("userId");

  //클릭한 캐릭터를 배열에 담는 함수
  const fillArray = (character) => {
    if (characterArray.includes(character)) {
      for (let i = 0; i < characterArray.length; i++) {
        if (characterArray[i] === character) {
          characterArray.splice(i, 1);
        }
      }
      console.log(characterArray);
      return;
    } else if (characterArray.length === 6) {
      return;
    }
    characterArray.push(character);
    console.log(characterArray);
  };
  //팝업 열고 닫는 함수
  const popupCloseHandler = (e) => {
    setVisibility(e);
  };
  // Input 값 상태 함수
  const onChangeCharacter = (event) => {
    setCharacter(event.target.value);
  };
  // 클라이언트에서 캐릭터 이름을 받아와서 해당 계정의 모든 캐릭터를 가져옴
  const getCharacters = async () => {
    try {
      let dataToSubmit = {
        name: character,
      };
      const response = await axios.post(
        `${CHARACTER_SERVER}/getCharacters`,
        dataToSubmit
      );
      setCharactersInfo(response.data.infoList);
      setShowPageNum(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id={styles.container}>
      <button onClick={() => setVisibility(!visibility)}>
        대표 캐릭터 가져오기
      </button>
      <CustomPopup onClose={popupCloseHandler} show={visibility}>
        <form
          className={styles["search-form"]}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            placeholder="캐릭터명을 입력해주세요"
            className={styles["search-form__input"]}
            id="character"
            type="text"
            value={character}
            onChange={onChangeCharacter}
          />
          <input
            className={styles["search-form__submit-btn"]}
            type="submit"
            value="가져오기"
            onClick={getCharacters}
          />
        </form>
        <div className={styles["info-box"]}>
          {charactersInfo.slice(offset, offset + limit).map((info, i) => (
            <div
              key={i}
              className={styles["info-content"]}
              onClick={() => {
                fillArray(info.name);
              }}
            >
              <img
                alt={info.className}
                src={info.img}
                className={styles["info-content__class-img"]}
              />
              <span className={styles["info-content__class-name"]}>
                {info.class}
              </span>
              <span className={styles["info-content__char-name"]}>
                {info.name}
              </span>
            </div>
          ))}
          {showPageNum ? (
            <>
              <Pagination
                total={charactersInfo.length}
                limit={limit}
                page={page}
                setPage={setPage}
              />
              <button className={styles["info-box__submit-btn"]}>
                저장하기
              </button>
            </>
          ) : null}
        </div>
      </CustomPopup>
    </div>
  );
}

export default TodoPage;
