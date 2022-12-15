import React, { useEffect, useState } from "react";
import styles from "./TodayPage.module.scss";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getCharacters,
  setGaugeValue,
  setTodayClear,
} from "../../slices/charactersSlice";
//axios
import axios from "axios";
import { CHARACTER_SERVER } from "../../components/Config";
//fontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

function TodayPage() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);
  const userId = localStorage.getItem("userId");

  const [isFetched, setIsFetched] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);

  useEffect(() => {
    //캐릭터 정보 가져옴
    const dataToSubmit = { userId };
    dispatch(getCharacters(dataToSubmit)).then((res) => {
      setIsFetched(true);
    });
  }, [dispatch, userId]);

  //설정 아이콘 on/off
  const ontoggleSetting = () => {
    setToggleSetting(!toggleSetting);
  };

  const getGuardianName = (level) => {
    if (level >= 1580) {
      return "소나벨";
    }
    if (level >= 1540) {
      return "하누마탄";
    }
    if (level >= 1490) {
      return "칼엘리고스";
    }
    if (level >= 1460) {
      return "쿤겔라니움";
    }
    if (level >= 1415) {
      return "데스칼루다";
    }
  };

  const updateClear = (name, clear, index, content) => {
    const dataToSubmit = {
      userId,
      name,
      clear,
      content,
    };
    dispatch(setTodayClear(dataToSubmit));
    axios.post(`${CHARACTER_SERVER}/updateTodayClear`, dataToSubmit);
  };

  const updateGaugeValue = (e, name, content) => {
    const value = e.target.value;
    const dataToSubmit = {
      userId,
      value,
      name,
      content,
    };

    if (value > 100 || value < 0 || value % 10 !== 0) {
      return;
    }

    dispatch(setGaugeValue(dataToSubmit));
    axios.post(`${CHARACTER_SERVER}/updateGaugeValue`, dataToSubmit);
  };

  const showGuageHandler = (gauge) => {
    const result = [];
    for (let i = 0; i < gauge / 10; i++) {
      result.push(
        <div className={`${styles["gauge-box"]} ${styles["active"]}`} key={i} />
      );
    }
    for (let i = gauge / 10; i < 10; i++) {
      result.push(
        <div
          className={`${styles["gauge-box"]} ${styles["inactive"]}`}
          key={i}
        />
      );
    }
    return result;
  };

  //로딩 화면
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
        <ul className={styles["today-wrap"]}>
          {characters.info.character.map((character, index) => (
            <li
              key={character.name}
              className={`${styles["todo-contents"]} ${styles["today-box"]}`}
            >
              <h1 className={styles["todo-contents__title"]}>
                {character.name} <span>{character.level}</span>
              </h1>
              {/* 가디언 토벌 */}
              <div
                className={`${styles["today-box__guardian-box"]} ${styles["today-box__contents-box"]}`}
              >
                {character.guardianRaid.clear === 2 && (
                  <div className={styles["today-box__contents-box__overlay"]} />
                )}
                <span className={styles["today-box__guardian-box__name"]}>
                  {getGuardianName(character.level)}
                </span>
                <div className={styles["rest-gauge"]}>
                  {showGuageHandler(character.guardianRaid.gauge)}
                  {toggleSetting ? (
                    <input
                      className={`${styles["rest-gauge-input"]} ${styles["today-box__contents-box__input"]}`}
                      type="number"
                      step="10"
                      placeholder={`${character.guardianRaid.gauge} / 100`}
                      onKeyUp={(e) => {
                        if (window.event.keyCode === 13) {
                          updateGaugeValue(e, character.name, "guardianRaid");
                        }
                      }}
                    />
                  ) : (
                    <span className={styles["rest-gauge-number"]}>
                      {`${character.guardianRaid.gauge} / 100`}
                    </span>
                  )}
                </div>
                <button
                  className={styles["today-box__clear-btn"]}
                  onClick={() => {
                    updateClear(
                      character.name,
                      character.guardianRaid.clear,
                      index,
                      "guardianRaid"
                    );
                  }}
                >
                  {`영혼 수확 : ${character.guardianRaid.clear} / 2`}
                </button>
              </div>
              {/* 카오스 던전 */}
              <div
                className={`${styles["today-box__chaosDungeon-box"]} ${styles["today-box__contents-box"]}`}
              >
                {character.chaosDungeon.clear === 2 && (
                  <div className={styles["today-box__contents-box__overlay"]} />
                )}
                <div className={styles["rest-gauge"]}>
                  {showGuageHandler(character.chaosDungeon.gauge)}
                  {toggleSetting ? (
                    <input
                      className={`${styles["rest-gauge-input"]} ${styles["today-box__contents-box__input"]}`}
                      type="number"
                      step="10"
                      placeholder={`${character.chaosDungeon.gauge} / 100`}
                      onKeyUp={(e) => {
                        if (window.event.keyCode === 13) {
                          updateGaugeValue(e, character.name, "chaosDungeon");
                        }
                      }}
                    />
                  ) : (
                    <span className={styles["rest-gauge-number"]}>
                      {`${character.chaosDungeon.gauge} / 100`}
                    </span>
                  )}
                </div>
                <button
                  className={styles["today-box__clear-btn"]}
                  onClick={() => {
                    updateClear(
                      character.name,
                      character.chaosDungeon.clear,
                      index,
                      "chaosDungeon"
                    );
                  }}
                >
                  {`클리어 : ${character.chaosDungeon.clear} / 2`}
                </button>
              </div>
            </li>
          ))}
        </ul>
        <label className={styles["switch"]}>
          <input
            id="switch-input"
            type="checkbox"
            onClick={ontoggleSetting}
            className={styles["switch-input"]}
          />
          <FontAwesomeIcon
            className={styles["switch-input__icon"]}
            icon={faGear}
          />
        </label>
      </div>
    );
  }
}

export default TodayPage;
