const express = require("express");
const router = express.Router();
const { Character } = require("../models/Character");
const axios = require("axios");
const cheerio = require("cheerio");

//=================================
//             Character
//=================================

router.post("/getCharacter", (req, res) => {
  const getHtml = async () => {
    try {
      const URI_Character = encodeURI(req.body.name);
      return await axios.get(
        `https://lostark.game.onstove.com/Profile/Character/${URI_Character}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  Character.findOne({ name: req.body.name }).exec((err, name) => {
    Character.findOne({ user: req.body.userId }).exec((err, user) => {
      if (user) {
        return res
          .status(200)
          .json({ message: "이미 등록된 캐릭터가 있습니다" });
      } else if (name) {
        return res.status(200).json({ message: "이미 등록된 캐릭터입니다" });
      } else {
        getHtml().then((html) => {
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
          const character = new Character(characterData);

          character.save((err, doc) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, doc });
          });
        });
      }
    });
  });
});

module.exports = router;
