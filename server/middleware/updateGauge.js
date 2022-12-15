const { Character } = require("../models/Character");
const moment = require("moment");
const { User } = require("../models/User");

const guardian = () => {
  console.log("hi");
};

const updateGauge = (req, res, next) => {
  const { userId } = req.body;
  User.findOne({ _id: userId }, (err, user) => {
    if (err) return res.status(400).send(err);
    if (moment().isSameOrAfter(user.DateToUpdate)) {
      const dayDiff = moment()
        .hour(6)
        .minute(0)
        .second(1)
        .diff(user.DateToUpdate, "days");
      //클리어를 하지 않았을 경우, 업데이트 기준 일 수 * 20 만큼 휴식게이지 증가
      //가디언 토벌
      Character.updateMany(
        { user: userId, "guardianRaid.clear": 0 },
        {
          $inc: {
            "guardianRaid.gauge": (dayDiff + 1) * 20,
          },
        }
      ).exec((err) => {
        if (err) return res.status(400).send(err);
        //카오스 던전
        Character.updateMany(
          { user: userId, "chaosDungeon.clear": 0 },
          {
            $inc: {
              "chaosDungeon.gauge": (dayDiff + 1) * 20,
            },
          }
        ).exec((err) => {
          if (err) return res.status(400).send(err);
          //한번만 클리어 했을 경우, 10 + (업데이트 기준 일 수 -1) * 20 만큼 휴식게이지 증가
          //가디언 토벌
          Character.updateMany(
            { user: userId, "guardianRaid.clear": 1 },
            {
              $set: {
                "guardianRaid.clear": 0,
              },
              $inc: {
                "guardianRaid.gauge": -20 + 10 + dayDiff * 20,
              },
            }
          ).exec((err) => {
            if (err) return res.status(400).send(err);
            //카오스 던전
            Character.updateMany(
              { user: userId, "chaosDungeon.clear": 1 },
              {
                $set: {
                  "chaosDungeon.clear": 0,
                },
                $inc: {
                  "chaosDungeon.gauge": -20 + 10 + dayDiff * 20,
                },
              }
            ).exec((err) => {
              if (err) return res.status(400).send(err);
              //두번 클리어 했을 경우, 휴식게이지 증가 x
              //가디언 토벌
              Character.updateMany(
                { user: userId, "guardianRaid.clear": 2 },
                {
                  $set: { "guardianRaid.clear": 0 },
                  $inc: {
                    "guardianRaid.gauge": -40 + dayDiff * 20,
                  },
                }
              ).exec((err) => {
                if (err) return res.status(400).send(err);
                //카오스 던전
                Character.updateMany(
                  { user: userId, "chaosDungeon.clear": 2 },
                  {
                    $set: { "chaosDungeon.clear": 0 },
                    $inc: {
                      "chaosDungeon.gauge": -40 + dayDiff * 20,
                    },
                  }
                ).exec((err) => {
                  if (err) return res.status(400).send(err);
                  //만약 게이지가 음수일 경우 0으로 초기화
                  //가디언 토벌
                  Character.updateMany(
                    { user: userId, "guardianRaid.gauge": { $lt: 0 } },
                    {
                      $set: { "guardianRaid.gauge": 0 },
                    }
                  ).exec((err) => {
                    if (err) return res.status(400).send(err);
                    //카오스 던전
                    Character.updateMany(
                      { user: userId, "chaosDungeon.gauge": { $lt: 0 } },
                      {
                        $set: { "chaosDungeon.gauge": 0 },
                      }
                    ).exec((err) => {
                      if (err) return res.status(400).send(err);
                      Character.updateMany(
                        { user: userId, "guardianRaid.gauge": { $gt: 100 } },
                        {
                          $set: { "guardianRaid.gauge": 100 },
                        }
                      ).exec((err) => {
                        if (err) return res.status(400).send(err);
                        Character.updateMany(
                          { user: userId, "chaosDungeon.gauge": { $gt: 100 } },
                          {
                            $set: { "chaosDungeon.gauge": 100 },
                          }
                        ).exec((err) => {
                          if (err) return res.status(400).send(err);
                          //업데이트 예정일 수정
                          User.updateOne(
                            { _id: userId },
                            {
                              $set: {
                                DateToUpdate: moment()
                                  .hour(6)
                                  .minute(0)
                                  .second(0)
                                  .add(1, "days")
                                  .toDate()
                                  .toISOString(),
                              },
                            }
                          ).exec((err) => {
                            if (err) return res.status(400).send(err);
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    }
  });
  next();
};

module.exports = { updateGauge };
