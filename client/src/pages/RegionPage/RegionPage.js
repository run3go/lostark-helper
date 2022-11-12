import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCharacters,
  setClear,
  updateClear,
} from "../../slices/charactersSlice";
import styles from "./RegionPage.module.scss";

function RegionPage() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);

  const [isFetched, setIsFetched] = useState(false);

  const regionList = [
    "발탄",
    "비아키스",
    "쿠크세이튼",
    "아브렐슈드",
    "일리아칸",
  ];

  const updateRaidClear = (name, region, clear) => {
    const userId = localStorage.getItem("userId");
    const dataToSubmit = { name, region, clear, userId };
    dispatch(updateClear(dataToSubmit));
  };

  const onChangeClear = (charIndex, raidIndex, clear) => {
    const dataToSubmit = { charIndex, raidIndex, clear };
    dispatch(setClear(dataToSubmit));
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
            ? styles["region-box__item--text-bold"]
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
                      onClick={() => {
                        updateRaidClear(
                          character.name,
                          raid.region,
                          raid.clear
                        );
                        onChangeClear(charIndex, raidIndex, raid.clear);
                      }}
                      key={raidIndex}
                      className={
                        raid.clear
                          ? `${styles["character-box__raid-item"]} ${styles["cleared"]}`
                          : styles["character-box__raid-item"]
                      }
                    >
                      <span
                        className={
                          styles["character-box__raid-item__region-name"]
                        }
                      >
                        {raid.region}
                      </span>
                      <span
                        className={
                          styles["character-box__raid-item__clear-number"]
                        }
                      >
                        {raid.clear ? "1 / 1" : "0 / 1"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default RegionPage;
