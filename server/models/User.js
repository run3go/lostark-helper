const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
    },
    role: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
    weeklyExpTodo: {
      type: Array,
      default: () => {
        return [
          { todo: "도전 어비스 던전", clear: false },
          { todo: "도전 가디언 레이드", clear: false },
        ];
      },
    },
    DateToReset: {
      type: String,
      default: () => {
        const dayOfWeek = moment().format("ddd");
        if (dayOfWeek === "Mon" || dayOfWeek === "Tue") {
          return moment().day(3).toDate().toISOString();
        }
        return moment().day(10).toDate().toISOString();
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    //DB의 패스워드 값이 변경,추가 되었을 때만 실행
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;

  let token = jwt.sign(user._id.toHexString(), "secretword");
  let oneHour = moment().add(1, "hour").valueOf();

  user.token = token;
  user.tokenExp = oneHour;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;

  jwt.verify(token, "secretword", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
