const { Character } = require("../models/Character");
const { User } = require("../models/User");
const moment = require("moment");

let resetByDate = (req, res, next) => {
  const { userId } = req.body;
  User.findOne({ _id: userId }).exec((err, user) => {
    if (moment().isSameOrAfter(user.DateToReset)) {
      Character.updateMany(
        { user: userId },
        {
          $set: {
            "regionRaid.$[].clear": false,
          },
        }
      ).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        User.updateOne(
          { _id: userId },
          {
            $set: {
              DateToReset: moment().day(10).toDate().toISOString(),
            },
          }
        ).exec();
      });
    }
  });
  next();
};

module.exports = { resetByDate };
