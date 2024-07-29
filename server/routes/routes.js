const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return res.status(404).send({
      success: false,
      message: "bu odan royxatdan otgan",
    });
  }
  //  parolni shifrlash
  let salt = bcrypt.genSaltSync(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await userModel.create({
    userName,
    email,
    password: passwordHash,
  });
  res.status(201).send({
    success: true,
    message: "foydalanuvchi qo'shildi",
    user,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.send({ success: false, message: "bu odam yuq" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.send({ success: false, message: "parol xato" });
  }

  const token = jwt.sign({ userName: user.userName }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.send({ success: true, message: "login success" });
});

router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "bu registratsiyadan otmagan",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAILIM,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    var mailOptions = {
      from: process.env.EMAILIM,
      to: email,
      subject: "Reset Password",
      text: `http://localhost:3000/resetpassword/${encodedToken}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.send({
          success: false,
          message: "email ga yuborilmadi xatolik",
          error: error,
        });
      } else {
        return res.send({ success: true, message: "emailga yuborildi" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/resetpassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.status(200).send({ success: true, message: "parol yangilandi" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  try {
    res.status(200).send({ success: true, message: "logout sucess" });
  } catch (error) {
    res.status(500).send({ success: false, message: "xatolik", error: error });
  }
});

module.exports = router;
