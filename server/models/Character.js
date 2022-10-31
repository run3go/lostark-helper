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

  updatedAt: {
    type: String,
    default: () => moment().format("dddd YYYY-MM-DD HH:mm:ss"),
  },
});

const Character = mongoose.model("Character", characterSchema);

module.exports = { Character };
