import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./WeekPage.module.scss";

import { addExp, removeExp, setTodoClear } from "../../slices/userSlice";
import {
  addChar,
  getCharacters,
  removeChar,
  updateCharClear,
} from "../../slices/charactersSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faGear,
  faCircleXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { USER_SERVER } from "../../components/Config";
import axios from "axios";

function WeekPage() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);
  const user = useSelector((state) => state.user);
  const userId = localStorage.getItem("userId");

  const [isFetched, setIsFetched] = useState(false);
  const [toggleSetting, setToggleSetting] = useState(false);

  //주간 원정대 숙제 클리어 여부 변경

  //설정 아이콘 on/off
  const ontoggleSetting = () => {
    setToggleSetting(!toggleSetting);
  };

  const updateExpClear = async (todo, clear, index) => {
    const dataToSubmit = { todo, clear, userId, index };
    await axios.post(`${USER_SERVER}/updateTodoClear`, dataToSubmit);
  };

  const setExpClear = (clear, index) => {
    const dataToSubmit = { clear, index };
    dispatch(setTodoClear(dataToSubmit));
  };

  const showInputHandler = (el) => {
    const iconElement = el.children[0];
    const inputElement = el.children[1];
    iconElement.style.display = "none";
    inputElement.style.display = "block";
    inputElement.focus();
  };

  const addCharTodo = (event) => {
    const dataToSubmit = {
      todo: event.target.value,
      userId,
    };
    console.log(dataToSubmit);
    dispatch(addChar(dataToSubmit));
  };

  const removeCharTodo = (todo) => {
    const dataToSubmit = {
      todo,
      userId,
    };
    dispatch(removeChar(dataToSubmit));
  };

  const addExpTodo = (event) => {
    const dataToSubmit = {
      todo: event.target.value,
      userId,
    };
    dispatch(addExp(dataToSubmit)).then((res) => {
      const liElement = event.target.parentNode;
      const iconElement = liElement.children[0];
      const inputElement = liElement.children[1];
      iconElement.style.display = "inline-block";
      inputElement.style.display = "none";
      inputElement.value = "";
    });
  };

  const removeExpTodo = (todo, clear, index) => {
    const dataToSubmit = {
      todo,
      clear,
      userId,
      index,
    };
    dispatch(removeExp(dataToSubmit));
  };

  const setCharClear = (name, todo, clear) => {
    const dataToSubmit = {
      name,
      todo,
      clear,
      userId,
    };
    dispatch(updateCharClear(dataToSubmit));
  };

  useEffect(() => {
    //캐릭터 정보 가져옴
    const dataToSubmit = { userId };
    dispatch(getCharacters(dataToSubmit)).then((res) => {
      setIsFetched(true);
    });
  }, [dispatch, userId]);

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

  return (
    <div className={styles["container"]}>
      <div className={`${styles["todo-contents"]} ${styles["character-box"]}`}>
        <h1 className={styles["todo-contents__title"]}>캐릭터</h1>
        <table>
          <thead>
            <tr>
              <th className={styles["character-box__table-header"]}></th>
              {isFetched &&
                characters.info.character.map((el, index) => (
                  <th
                    key={index}
                    className={styles["character-box__table-header"]}
                  >
                    {el.name}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {isFetched &&
              characters.info.character[0].weeklyCharTodo.map((el, index) => (
                <tr key={el.todo}>
                  <td className={styles["character-box__table-cell-title"]}>
                    {el.todo}
                    {toggleSetting ? (
                      <FontAwesomeIcon
                        className={styles["character-box__rm-btn"]}
                        icon={faCircleXmark}
                        onClick={() => {
                          removeCharTodo(el.todo);
                        }}
                      />
                    ) : null}
                  </td>
                  {isFetched &&
                    characters.info.character.map((elem) => (
                      <td
                        key={elem.name}
                        className={styles["character-box__table-cell"]}
                        onClick={() => {
                          setCharClear(
                            elem.name,
                            elem.weeklyCharTodo[index].todo,
                            elem.weeklyCharTodo[index].clear
                          );
                        }}
                      >
                        {elem.weeklyCharTodo[index].clear ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : null}
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
        <div
          className={styles["character-box__add-btn-wrap"]}
          onClick={(e) => {
            showInputHandler(e.currentTarget);
          }}
        >
          <FontAwesomeIcon
            className={styles["character-box__add-btn"]}
            icon={faCirclePlus}
          />
          <input
            className={styles["character-box__add-input"]}
            type="text"
            id="todo"
            onKeyUp={(e) => {
              if (window.event.keyCode === 13) {
                addCharTodo(e);
              }
            }}
          />
        </div>
      </div>
      <div className={`${styles["todo-contents"]} ${styles["expedition-box"]}`}>
        <h1 className={styles["todo-contents__title"]}>원정대</h1>
        <ul className={styles["expedition-box__list"]}>
          {isFetched &&
            user.userData.weeklyExpTodo.map((el, index) => (
              <li
                onClick={() => {
                  updateExpClear(el.todo, el.clear, index);
                  setExpClear(el.clear, index);
                }}
                key={index}
                className={
                  el.clear
                    ? styles["expedition-box__item--active"]
                    : styles["expedition-box__item"]
                }
              >
                <span className={styles["expedition-box__item__todo-text"]}>
                  {el.todo}
                </span>
                {toggleSetting ? (
                  <FontAwesomeIcon
                    className={styles["expedition-box__item__rm-btn"]}
                    icon={faCircleXmark}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExpTodo(el.todo, el.clear, index);
                    }}
                  />
                ) : null}
              </li>
            ))}
          <li
            className={styles["expedition-box__item"]}
            onClick={(e) => {
              showInputHandler(e.currentTarget);
            }}
          >
            <FontAwesomeIcon
              className={styles["expedition-box__item__add-btn"]}
              icon={faCirclePlus}
            />
            <input
              className={styles["expedition-box__item__add-input"]}
              type="text"
              id="todo"
              onKeyUp={(e) => {
                if (window.event.keyCode === 13) {
                  addExpTodo(e);
                }
              }}
            />
          </li>
        </ul>
      </div>
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

export default WeekPage;
