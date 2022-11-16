import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCharacters,
  setClear,
  setRegion,
  updateClear,
  updateRegion,
} from "../../slices/charactersSlice";
import styles from "./RegionPage.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
function RegionPage() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);
  const userId = localStorage.getItem("userId");

  const [isFetched, setIsFetched] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);

  const regionList = [
    "발탄",
    "비아키스",
    "쿠크세이튼",
    "아브렐슈드",
    "일리아칸",
  ];

  const showHandler = (event) => {
    const ulElement = event.currentTarget.nextElementSibling;
    const compStyles = window.getComputedStyle(ulElement);
    if (compStyles.getPropertyValue("display") === "none") {
      ulElement.style.display = "block";
    } else {
      ulElement.style.display = "none";
    }
  };

  const ontoggleSetting = () => {
    setToggleSetting(!toggleSetting);
  };

  const updateRaidClear = (name, region, clear) => {
    const dataToSubmit = { name, region, clear, userId };
    dispatch(updateClear(dataToSubmit));
  };

  const updatesRegion = (name, currentRegion, nextRegion) => {
    const dataToSubmit = { name, currentRegion, nextRegion, userId };
    dispatch(updateRegion(dataToSubmit));
  };

  const onChangeClear = (charIndex, raidIndex, clear) => {
    const dataToSubmit = { charIndex, raidIndex, clear };
    dispatch(setClear(dataToSubmit));
  };

  const onChangeRegion = (event, charIndex, raidIndex, nextRegion) => {
    const dataToSubmit = { charIndex, raidIndex, nextRegion };
    dispatch(setRegion(dataToSubmit));
    const ulElement = event.currentTarget.parentElement;
    ulElement.style.display = "none";
  };

  const getTotalClear = () => {
    const totalClearRaid = characters.info.data.reduce(
      (ac, current, index, array) => {
        const clearRaid = current.regionRaid.filter((raid) => {
          return raid.clear === true;
        }).length;
        ac = ac + clearRaid;
        return ac;
      },
      0
    );

    const totalRaid = characters.info.data.reduce(
      (ac, current, index, array) => {
        ac = ac + current.regionRaid.length;
        return ac;
      },
      0
    );

    return (
      <span
        className={
          totalClearRaid === totalRaid
            ? styles["total-clear-box__text--font-bold"]
            : styles["total-clear-box__text"]
        }
      >
        {totalClearRaid + " / " + totalRaid}{" "}
      </span>
    );
  };

  const getRegionClear = (region) => {
    const clearTimes = characters.info.data.filter((character) => {
      const clearRaid = character.regionRaid.filter((raid) => {
        if (raid.region === region) {
          return raid.clear === true;
        }
        return null;
      }).length;
      return clearRaid === 1;
    }).length;

    const allTargetRaid = characters.info.data.filter((character) => {
      const targetRaid = character.regionRaid.filter((raid) => {
        return raid.region === region;
      }).length;
      return targetRaid === 1;
    }).length;

    return (
      <li
        key={region}
        className={
          clearTimes === allTargetRaid
            ? styles["region-box__item--font-bold"]
            : styles["region-box__item"]
        }
      >
        <span>{region}</span>
        <span> {clearTimes + " / " + allTargetRaid}</span>
      </li>
    );
  };

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
      <div
        className={`${styles["todo-contents"]} ${styles["total-clear-box"]}`}
      >
        <h1 className={styles["todo-contents__title"]}>총합</h1>
        {isFetched && getTotalClear()}
      </div>
      <div className={`${styles["todo-contents"]} ${styles["region-box"]}`}>
        <h1 className={styles["todo-contents__title"]}>군단장</h1>
        {isFetched && (
          <ul className={styles["region-box__list"]}>
            {regionList.map((region) => {
              return getRegionClear(region);
            })}
          </ul>
        )}
      </div>
      <ul className={styles["character-wrap"]}>
        {isFetched &&
          characters.info.data.map((character, charIndex) => (
            <li
              key={charIndex}
              className={`${styles["character-box"]} ${styles["todo-contents"]}`}
            >
              <h1 className={styles["todo-contents__title"]}>
                {character.name} <span>{character.level}</span>
              </h1>
              <ul className={styles["character-box__raid-list"]}>
                {character.regionRaid.map((raid, raidIndex) => {
                  return (
                    <li
                      key={raidIndex}
                      className={styles["character-box__raid-item"]}
                    >
                      <div
                        onClick={() => {
                          updateRaidClear(
                            character.name,
                            raid.region,
                            raid.clear
                          );
                          onChangeClear(charIndex, raidIndex, raid.clear);
                        }}
                        className={
                          raid.clear
                            ? `${styles["character-box__raid-item__box"]} ${styles["cleared"]}`
                            : styles["character-box__raid-item__box"]
                        }
                      >
                        <span
                          className={
                            styles["character-box__raid-item__box__region-name"]
                          }
                        >
                          {raid.region}
                        </span>
                        <span
                          className={
                            styles[
                              "character-box__raid-item__box__clear-number"
                            ]
                          }
                        >
                          {raid.clear ? "1 / 1" : "0 / 1"}
                        </span>
                      </div>
                      {toggleSetting ? (
                        <div
                          className={
                            styles["character-box__raid-item__setting-box"]
                          }
                        >
                          <button
                            onClick={(e) => {
                              showHandler(e);
                            }}
                            className={
                              styles["character-box__raid-item__setting-btn"]
                            }
                          >
                            <FontAwesomeIcon
                              className={
                                styles[
                                  "character-box__raid-item__setting-btn__icon"
                                ]
                              }
                              icon={faGear}
                            />
                          </button>
                          <ul
                            className={
                              styles[
                                "character-box__raid-item__setting-box__raid-list"
                              ]
                            }
                          >
                            {regionList
                              .filter((region) => {
                                const array = [];
                                for (
                                  let i = 0;
                                  i < character.regionRaid.length;
                                  i++
                                ) {
                                  if (
                                    region === character.regionRaid[i].region
                                  ) {
                                    array.push(false);
                                  } else {
                                    array.push(true);
                                  }
                                }
                                if (array.includes(false)) {
                                  return false;
                                } else {
                                  return true;
                                }
                              })
                              .map((nextRegion) => {
                                return (
                                  <li
                                    key={nextRegion}
                                    onClick={(e) => {
                                      updatesRegion(
                                        character.name,
                                        raid.region,
                                        nextRegion
                                      );
                                      onChangeRegion(
                                        e,
                                        charIndex,
                                        raidIndex,
                                        nextRegion
                                      );
                                    }}
                                    className={
                                      styles[
                                        "character-box__raid-item__setting-box__raid-item"
                                      ]
                                    }
                                  >
                                    {nextRegion}
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
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

export default RegionPage;
