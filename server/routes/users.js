const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true });
  });
});

router.post("/checkEmail", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({ success: true, message: "사용 가능한 이메일입니다" });
    res.json({ message: "이미 사용 중인 이메일입니다" });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("x_authExp", user.tokenExp);
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user_id,
    isAuth: true,
    email: req.user.email,
    isAdmin: req.user.role === 0 ? false : true,
    weeklyExpTodo: req.user.weeklyExpTodo,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true });
    }
  );
});

router.post("/updateTodoClear", (req, res) => {
  const { todo, clear, userId, index } = req.body;
  console.log("hi");
  User.updateOne(
    { _id: userId, "weeklyExpTodo.todo": todo },
    { $set: { "weeklyExpTodo.$.clear": !clear } }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/addExp", (req, res) => {
  const { todo, userId } = req.body;
  const data = {
    todo,
    clear: false,
  };
  User.updateOne({ _id: userId }, { $push: { weeklyExpTodo: data } }).exec(
    (err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ data });
    }
  );
});

router.post("/removeExp", (req, res) => {
  const { todo, clear, userId, index } = req.body;
  const data = {
    todo,
    clear,
  };
  User.updateOne({ _id: userId }, { $pull: { weeklyExpTodo: data } }).exec(
    (err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ data, index });
    }
  );
});

module.exports = router;
