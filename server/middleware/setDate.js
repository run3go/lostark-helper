const { User } = require("../models/User");
const moment = require("moment");

let setDate = (req, res, next) => {
  const { userId } = req.body;
  User.updateOne(
    { _id: userId },
    {
      $set: {
        updatedAt: moment().toDate().toISOString(),
      },
    }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
  });
  next();
};

module.exports = { setDate };
