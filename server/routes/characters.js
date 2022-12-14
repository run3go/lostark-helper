const express = require("express");
const Mongoose = require("mongoose");
const router = express.Router();
const { Character } = require("../models/Character");
const axios = require("axios");
const cheerio = require("cheerio");
const { resetByDate } = require("../middleware/resetByDate");
const { updateGauge } = require("../middleware/updateGauge");
const { setDate } = require("../middleware/setDate");

//=================================
//             Character
//=================================

//캐릭터 이름으로 HTML 파싱
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
//캐릭터 리스트 가져오기
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
//캐릭터 정보를 DB에 저장하기
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
//캐릭터 정보 가져오기
router.post(
  "/getCharactersInfo",
  updateGauge,
  setDate,
  resetByDate,
  (req, res) => {
    Character.find({ user: req.body.userId })
      .sort({ level: -1 })
      .exec((err, character) => {
        if (err) return res.status(400).send(err);
        if (character.length === 0) {
          res.status(200).json({ success: false });
        } else {
          res.status(200).json({ success: true, character });
        }
      });
  }
);
//군단장 숙제 클리어 업데이트
router.post("/updateRaidClear", (req, res) => {
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
//군단장 숙제 업데이트
router.post("/updateRegion", (req, res) => {
  const { char, currentRegion, regionName, regionId, userId } = req.body;
  Character.updateOne(
    { user: userId, name: char, "regionRaid.region": currentRegion },
    {
      $set: {
        "regionRaid.$.region": regionName,
        "regionRaid.$.id": regionId,
      },
    }
  ).exec((err) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});
//주가 캐릭터 숙제 추가
router.post("/addChar", (req, res) => {
  const { userId, todo } = req.body;
  const data = {
    todo,
    disabled: false,
    clear: false,
  };
  Character.updateMany(
    {
      user: userId,
    },
    {
      $push: {
        weeklyCharTodo: data,
      },
    }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ data });
  });
});
//주간 캐릭터 숙제 제거
router.post("/removeChar", (req, res) => {
  const { userId, todo, index } = req.body;
  const data = {
    todo,
    disabled: false,
    clear: false,
  };
  Character.updateOne(
    { user: userId, "weeklyCharTodo.todo": todo },
    {
      $set: {
        "weeklyCharTodo.$.clear": false,
        "weeklyCharTodo.$.disabled": false,
      },
    }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    Character.updateMany(
      {
        user: userId,
      },
      {
        $pull: {
          weeklyCharTodo: data,
        },
      }
    ).exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ todo, index });
    });
  });
});
//주간 캐릭터 숙제 클리어 업데이트
router.post("/updateCharClear", (req, res) => {
  const { name, todo, clear, userId } = req.body;
  Character.updateOne(
    {
      user: userId,
      name,
      "weeklyCharTodo.todo": todo,
    },
    {
      $set: {
        "weeklyCharTodo.$.clear": !clear,
      },
    }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ name, todo, clear: !clear });
  });
});
//주간 캐릭터 숙제 비활성화
router.post("/updateCharDisabled", (req, res) => {
  const { name, todo, disabled, userId } = req.body;
  Character.updateOne(
    {
      user: userId,
      name,
      "weeklyCharTodo.todo": todo,
    },
    {
      $set: {
        "weeklyCharTodo.$.disabled": !disabled,
        "weeklyCharTodo.$.clear": false,
      },
    }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

//주간 캐릭터 숙제 비활성화
router.post("/updateCharDisabled", (req, res) => {
  const { name, todo, disabled, userId } = req.body;
  Character.updateOne(
    {
      user: userId,
      name,
      "weeklyCharTodo.todo": todo,
    },
    {
      $set: {
        "weeklyCharTodo.$.disabled": !disabled,
        "weeklyCharTodo.$.clear": false,
      },
    }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});
//일일 가디언 수확 / 카오스 던전 클리어
router.post("/updateTodayClear", (req, res) => {
  const { name, userId, clear, content } = req.body;
  let obj = {};
  obj[`${content}.clear`] = 0;
  if (clear === 2) {
    Character.updateOne(
      { user: userId, name },
      {
        $set: obj,
      }
    ).exec((err) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true });
    });
  } else if (clear < 2) {
    obj[`${content}.clear`] = 1;
    Character.updateOne(
      { user: userId, name },
      {
        $inc: obj,
      }
    ).exec((err) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true });
    });
  }
});
//휴식 게이지 수정
router.post("/updateGaugeValue", (req, res) => {
  const { userId, name, value, content } = req.body;
  let obj = {};
  obj[`${content}.gauge`] = value;
  Character.updateOne({ user: userId, name }, { $set: obj }).exec((err) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
