const { Character } = require("../models/Character");
const { User } = require("../models/User");
const moment = require("moment");

let resetByDate = (req, res, next) => {
  const { userId } = req.body;
  User.findOne({ _id: userId }),
    (err, user) => {
      if (err) return res.status(400).send(err);
      if (moment().isSameOrAfter(user.DateToReset)) {
        Character.updateMany(
          { user: userId },
          {
            $set: {
              "regionRaid.$[].clear": false,
              "weeklyCharTodo.$[].clear": false,
            },
          }
        ).exec((err, doc) => {
          if (err) return res.status(400).send(err);
          User.updateOne(
            { _id: userId },
            {
              $set: {
                "weeklyExpTodo.$[].clear": false,
                DateToReset: moment().day(10).toDate().toISOString(),
              },
            }
          ).exec((err, doc) => {
            if (err) res.status(400).send(err);
          });
        });
      }
    };
  next();
};

module.exports = { resetByDate };
