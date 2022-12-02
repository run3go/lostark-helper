const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const characterSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
    trim: true,
    required: true,
  },

  level: {
    type: Number,
  },

  chaosDungeon: {
    type: Number,
    default: 0,
    max: 100,
  },

  guardianRaid: {
    type: Number,
    default: 0,
    max: 100,
  },

  regionRaid: {
    type: Array,
  },

  updatedAt: {
    type: String,
    default: () => moment().toDate(),
  },
});

characterSchema.pre("save", function (next) {
  let character = this;
  const raidArray = [];
  if (character.level >= 1415) {
    raidArray.push({ region: "발탄", clear: false, id: 0 });
    if (character.level >= 1430) {
      raidArray.push({ region: "비아키스", clear: false, id: 1 });
      if (character.level >= 1475) {
        raidArray.push({ region: "쿠크세이튼", clear: false, id: 2 });
        if (character.level >= 1490) {
          raidArray.shift();
          raidArray.push({ region: "아브렐슈드", clear: false, id: 3 });
          if (character.level >= 1580) {
            raidArray.shift();
            raidArray.push({ region: "일리아칸", clear: false, id: 4 });
            character.regionRaid = raidArray;
            next();
          } else {
            character.regionRaid = raidArray;
            next();
          }
        } else {
          character.regionRaid = raidArray;
          next();
        }
      } else {
        character.regionRaid = raidArray;
        next();
      }
    }
  } else {
    next();
  }
});

let setDate = (req, res, next) => {
  const { userId } = req.body;
  Character.updateMany(
    { user: userId },
    {
      $set: {
        updatedAt: moment().toDate(),
      },
    }
  ).exec((err, user) => {
    if (err) throw err;
  });
  next();
};

const Character = mongoose.model("Character", characterSchema);

module.exports = { Character, setDate };
