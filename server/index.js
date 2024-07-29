const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
const appRouter = require("./routes/routes");
const otpRoutes = require("./routes/routes2");
const cors = require("cors");
const datDB = require("./db/db");
const cookieParser = require("cookie-parser");
const randomstring = require("randomstring");
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// const otbCache = {};

// // generate otp
// function generateOTP() {
//   return randomstring.generate({ length: 4, charset: "numeric" });
// }

app.use("/auth", appRouter);
app.use("/", otpRoutes);
datDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port}-da ishladi`);
});
