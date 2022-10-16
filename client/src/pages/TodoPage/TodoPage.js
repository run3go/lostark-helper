import axios from "axios";
import React, { useState } from "react";
import styles from "./TodoPage.module.scss";
import { CHARACTER_SERVER } from "../../components/Config";
import CustomPopup from "../../components/CustomPopup/CustomPopup";

function TodoPage() {
  const [Visibility, setVisibility] = useState(false);
  const [Character, setCharacter] = useState("");

  const userId = localStorage.getItem("userId");

  const popupCloseHandler = (e) => {
    setVisibility(e);
  };

  const onChangeCharacter = (event) => {
    setCharacter(event.target.value);
  };

  const getAllCharacters = async () => {
    try {
      let dataToSubmit = {
        name: Character,
        userId,
      };

      let response = await axios.post(
        `${CHARACTER_SERVER}/getCharacter`,
        dataToSubmit
      );

      dataToSubmit = {
        list: response.data.list,
      };
      console.log(dataToSubmit);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <button onClick={() => setVisibility(!Visibility)}>
        대표 캐릭터 가져오기
      </button>
      <CustomPopup onClose={popupCloseHandler} show={Visibility}>
        <form
          className={styles.getChar_form_box}
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            placeholder="캐릭터명을 입력해주세요"
            className={styles.input_box}
            id="character"
            type="text"
            value={Character}
            onChange={onChangeCharacter}
          />
          <input
            className={styles.submit_btn}
            type="submit"
            value="가져오기"
            onClick={getAllCharacters}
          />
        </form>
      </CustomPopup>
    </div>
  );
}

export default TodoPage;
