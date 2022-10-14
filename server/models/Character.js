const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      trim: true,
      unique: 1,
    },

    className: {
      type: String,
    },

    level: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Character = mongoose.model("Character", characterSchema);

module.exports = { Character };
