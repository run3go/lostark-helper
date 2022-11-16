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
    let URI_Character = encodeURI(name);
    let parsingHtml = await axios.get(
      `https://lostark.game.onstove.com/Profile/Character/${URI_Character}`
    );
    return cheerio.load(parsingHtml.data);
  } catch (error) {
    return console.log(error);
  }
};

router.post("/saveCharacters", (req, res) => {
  Character.findOne({ user: req.body.userId }).exec(async (err, user) => {
    if (!user) {
      //원정대 캐릭터들의 정보들을 가져와서 객체에 담는다.
      const characterList = req.body.characters;
      characterList.forEach(async (characterData, i) => {
        const characterInfo = {
          user: req.body.userId,
          name: characterData.name,
          level: characterData.level,
        };

        const character = new Character(characterInfo);

        character.save((err, doc) => {
          console.log(doc);
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

router.post("/getCharacterList", async (req, res) => {
  try {
    let infoArray = [];
    let count = 0;
    const $ = await getHtml(req.body.name);
    const characterArray = $("ul.profile-character-list__char > li");

    characterArray.each(async (i, el) => {
      const characterName = $(el).find("span > button > span").text();
      const className = $(el).find("span > button > img").attr("alt");
      const classImage = $(el).find("span > button > img").attr("src");
      //캐릭터명으로 한번 더 파싱
      const $$ = await getHtml(characterName);
      const itemLevel = Number(
        $$(
          "#lostark-wrapper > div > main > div > div.profile-ingame > div.profile-info > div.level-info2 > div.level-info2__item > span:nth-child(2)"
        )
          .text()
          .substring(3)
          .replace(",", "")
      );
      const characterInfo = {
        name: characterName,
        class: className,
        img: classImage,
        level: itemLevel,
      };
      infoArray.push(characterInfo);
      count++;
      if (count === characterArray.length) {
        res.status(200).json({ success: true, infoArray });
      }
    });
  } catch (error) {
    if (error) res.status(400).send(error);
  }
});

router.post("/updateClear", (req, res) => {
  const { region, name, clear, userId } = req.body;
  Character.updateOne(
    { user: userId, name: name, "regionRaid.region": region },
    {
      $set: {
        "regionRaid.$.clear": !clear,
      },
    }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ clear });
  });
});

router.post("/updateRegion", (req, res) => {
  const { name, currentRegion, nextRegion, userId } = req.body;
  Character.updateOne(
    { user: userId, name: name, "regionRaid.region": currentRegion },
    {
      $set: {
        "regionRaid.$.region": nextRegion,
      },
    }
  )
    .update()
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ nextRegion });
    });
});

router.post("/getCharactersInfo", (req, res) => {
  Character.find({ user: req.body.userId })
    .sort({ level: -1 })
    .exec((err, data) => {
      if (err) return res.status(400).send(err);
      if (data.length === 0) {
        res.status(200).json({ success: false });
      } else {
        res.status(200).json({ success: true, data });
      }
    });
});

module.exports = router;
