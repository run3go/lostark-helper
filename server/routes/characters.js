const express = require("express");
const router = express.Router();
const { Character } = require("../models/Character");
const axios = require("axios");
const cheerio = require("cheerio");

//=================================
//             Character
//=================================

const getHtml = async (name) => {
  try {
    const URI_Character = encodeURI(name);
    const parsingHtml = await axios.get(
      `https://lostark.game.onstove.com/Profile/Character/${URI_Character}`
    );
    return cheerio.load(parsingHtml.data);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getAllCharacters = ($) => {
  let characterList = [];
  const $bodyList = $("#expand-character-list > ul > li")
    .children("span")
    .children("button")
    .children("span");
  $bodyList.map((i, el) => {
    characterList[i] = $(el).text();
    return characterList[i];
  });
  return characterList;
  //원정대의 모든 캐릭터명을 배열에 담음
};

router.post("/saveCharacters", (req, res) => {
  Character.findOne({ user: req.body.userId }).exec(async (err, user) => {
    if (!user) {
      const parsedHtml = await getHtml(req.body.name);
      const characterList = getAllCharacters(parsedHtml);
      //원정대 캐릭터들의 정보들을 가져와서 객체에 담는다.

      characterList.forEach(async (characterName, i) => {
        const $ = await getHtml(characterName);
        const className = $("div.profile-character-info > img").attr("alt");
        const level = $("div.level-info2__item > span:nth-child(2)")
          .text()
          .substring(3)
          .replace(",", "");
        const img = $("div.profile-character-info > img").attr("src");

        const characterInfo = {
          user: req.body.userId,
          name: characterName,
          className,
          level,
          img,
        };

        const character = new Character(characterInfo);

        character.save((err, doc) => {
          if (err) return res.status(400).send(err);
        });
        //캐릭터를 DB에 저장합니다.
      });
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
    } else {
      return res
        .status(200)
        .json({ message: "이미 등록된 캐릭터가 있습니다." });
    }
  });
});

router.post("/getCharacters", async (req, res) => {
  const infoList = [];
  const $ = await getHtml(req.body.name);
  const characterList = $("ul.profile-character-list__char > li");

  characterList.each((i, el) => {
    const characterName = $(el).find("span > button > span").text();
    const className = $(el).find("span > button > img").attr("alt");
    const classImage = $(el).find("span > button > img").attr("src");
    const characterInfo = {
      name: characterName,
      class: className,
      img: classImage,
    };
    infoList.push(characterInfo);
  });
  res.status(200).json({ success: true, infoList });
});

module.exports = router;
