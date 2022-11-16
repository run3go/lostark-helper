import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { CHARACTER_SERVER } from "../Config";
import styles from "./CustomPopup.module.scss";
import Pagination from "../../components/Pagination/Pagination";

function CustomPopup(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStandby, setIsStandby] = useState(true);
  const [showPageNum, setShowPageNum] = useState(false);
  const [page, setPage] = useState(1);

  const [character, setCharacter] = useState("");
  const [charactersInfo, setCharactersInfo] = useState([]);
  const [characterArray, setCharacterArray] = useState([]);

  const limit = 9;
  const offset = (page - 1) * limit;
  const userId = localStorage.getItem("userId");

  const closeHandler = () => {
    setShow(false);
    props.onClose(false);
  };
  useEffect(() => {
    if (charactersInfo.length === 0) {
      setIsStandby(true);
    }
    setShow(props.show);
  }, [props.show, charactersInfo]);

  // Input 값 상태 함수
  const onChangeCharacter = (event) => {
    setCharacter(event.target.value);
  };
  // 클라이언트에서 캐릭터 이름을 받아와서 해당 계정의 모든 캐릭터를 가져옴
  const getCharacterList = async () => {
    try {
      setCharacterArray([]);
      setPage(1);
      setLoading(true);
      const dataToSubmit = {
        name: character,
      };
      const response = await axios.post(
        `${CHARACTER_SERVER}/getCharacterList`,
        dataToSubmit
      );

      response.data.infoArray.sort((a, b) => b.level - a.level);

      setCharactersInfo(response.data.infoArray);
    } catch (error) {
      console.log(error);
    }
    setShowPageNum(true);
    setIsStandby(false);
    setLoading(false);
  };
  //서버에 선택한 캐릭터들을 저장함
  const saveCharacters = async () => {
    try {
      const dataToSubmit = {
        characters: characterArray,
        userId,
      };

      let response = await axios.post(
        `${CHARACTER_SERVER}/saveCharacters`,
        dataToSubmit
      );
      if (response.data.message) {
        alert(response.data.message);
      }
      closeHandler();
    } catch (error) {
      console.log(error);
    }
  };

  //클릭한 캐릭터를 배열에 담는 함수
  const fillArray = (name, level) => {
    if (characterArray.some((character) => character.name === name)) {
      for (let i = 0; i < characterArray.length; i++) {
        if (characterArray[i].name === name) {
          setCharacterArray(
            characterArray.filter((element) => {
              return element.name !== name;
            })
          );
        }
      }
      return;
    } else if (characterArray.length === 6) {
      return;
    }

    setCharacterArray((current) => [{ name, level }, ...current]);
  };

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0",
      }}
      className={styles["overlay"]}
    >
      <div className={styles["popup"]}>
        <span className={styles["popup--close"]} onClick={closeHandler}>
          &times;
        </span>
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
            onClick={getCharacterList}
          />
        </form>
        {isStandby ? (
          <span className={styles["standby-text"]}>Lostark Helper</span>
        ) : loading ? (
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
        ) : (
          <div className={styles["info-box"]}>
            {charactersInfo.slice(offset, offset + limit).map((info, i) => (
              <div
                key={i}
                className={styles["info-content"]}
                onClick={() => {
                  fillArray(info.name, info.level);
                }}
              >
                <img
                  alt={info.class}
                  src={info.img}
                  className={styles["info-content__class-img"]}
                />
                <span className={styles["info-content__class-name"]}>
                  {info.class}
                </span>
                {characterArray.some(
                  (character) => character.name === info.name
                ) ? (
                  <FontAwesomeIcon
                    className={styles["info-content__checked-icon"]}
                    icon={faCircleCheck}
                  />
                ) : null}
                <span className={styles["info-content__char-name"]}>
                  {info.name}
                </span>
                <span className={styles["info-content__char-level"]}>
                  {info.level}
                </span>
              </div>
            ))}
            <ul className={styles["info-box__chosen-char-list"]}>
              {characterArray.map((character, i) => (
                <li
                  onClick={() =>
                    setCharacterArray(
                      characterArray.filter((element) => {
                        return element !== character.name;
                      })
                    )
                  }
                  className={styles["info-box__chosen-char-item"]}
                  key={i}
                >
                  {character.name}
                </li>
              ))}
            </ul>
            {showPageNum ? (
              <>
                <Pagination
                  total={charactersInfo.length}
                  limit={limit}
                  page={page}
                  setPage={setPage}
                />
                <button
                  onClick={saveCharacters}
                  className={styles["info-box__submit-btn"]}
                >
                  저장하기
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomPopup;
