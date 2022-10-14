import axios from "axios";
import React, { useState } from "react";
import styles from "./TodayPage.module.scss";
import { CHARACTER_SERVER } from "../../components/Config";

function TodayPage() {
  const [Character, setCharacter] = useState("");
  const userId = localStorage.getItem("userId");

  const onChangeCharacter = (event) => {
    setCharacter(event.target.value);
  };

  const getCharacter = async () => {
    try {
      const dataToSubmit = {
        name: Character,
        userId,
      };

      let response = await axios.post(
        `${CHARACTER_SERVER}/getCharacter`,
        dataToSubmit
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <form
        className={styles.getChar_form_box}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          id="character"
          type="text"
          value={Character}
          onChange={onChangeCharacter}
        />
        <input
          className={styles.submit_btn}
          type="submit"
          value="대표 캐릭터 가져오기"
          onClick={getCharacter}
        />
      </form>
    </div>
  );
}

export default TodayPage;
