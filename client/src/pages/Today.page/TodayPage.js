import React, { useEffect, useState } from "react";
import styles from "./TodayPage.module.scss";
import axios from "axios";
import { CHARACTER_SERVER } from "../../components/Config";

function TodayPage() {
  const [charactersInfo, setCharactersInfo] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const getData = async () => {
      let dataToSubmit = { userId };
      const response = await axios.post(
        `${CHARACTER_SERVER}/getCharactersInfo`,
        dataToSubmit
      );
      setCharactersInfo(response.data.info);
    };
    getData();
  }, []);
  return <div>TodayPage</div>;
}

export default TodayPage;
