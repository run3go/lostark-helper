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
    return await axios.get(
      `https://lostark.game.onstove.com/Profile/Character/${URI_Character}`
    );
  } catch (error) {
    console.log(error);
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

router.post("/getCharacter", (req, res) => {
  Character.findOne({ user: req.body.userId }).exec((err, user) => {
    if (user) {
      getHtml(req.body.name).then((html) => {
        const $ = cheerio.load(html.data);
        const characterList = getAllCharacters($);
        return res.status(200).json({
          message: "이미 등록된 캐릭터가 있습니다",
          list: characterList,
        });
      });
      // 이미 등록된 캐릭터가 있는지 확인
    } else {
      getHtml(req.body.name).then((html) => {
        const $ = cheerio.load(html.data);
        const className = $("div.profile-character-info > img").attr("alt");
        const level = $("div.level-info2__item > span:nth-child(2)")
          .text()
          .substring(3)
          .replace(",", "");

        const characterData = {
          user: req.body.userId,
          name: req.body.name,
          className,
          level,
        };
        const characterList = getAllCharacters($);
        //입력한 대표 캐럭터의 정보를 정리
        const character = new Character(characterData);

        character.save((err, info) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, info, list: characterList });
        });
      });
    }
  });
});

module.exports = router;
