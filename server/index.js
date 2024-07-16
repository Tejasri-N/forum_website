const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bodyParser = require("body-parser");
require("dotenv").config();

const client = require("./db");
const postRoute = require("./postRouting");
const profileRoute = require("./profileRouting")
const commentRoute = require("./commentRouting");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// SIGN UP
app.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body.formData;

  if (!name || typeof name !== "string" || name.charAt(0) === " ") {
    return res.json({ status: "error", error: "Invalid name" });
  }

  if (!password || typeof password !== "string" || password.charAt(0) === " ") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (!email || email.charAt(0) === " ") {
    alert("Invalid email");
    return res.json({ status: "error", error: "Invalid email" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.query(
      "INSERT INTO users_data (username, email, hashed_password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );
    await client.query(
      "insert into users_profile (username) values ($1)",
      [name]
    );
    res.json({ status: "ok" });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Email already in use" });
    }
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
});

// SIGN IN
app.post("/signIn", async (req, res) => {
  const { email, password } = req.body.formData;

  if (!email || !password) {
    return res.json({ status: "error", error: "Invalid email or password" });
  }

  try {
    const user = await client.query(
      "SELECT * FROM users_data WHERE email = $1",
      [email]
    );
    if (user.rows.length === 0) {
      return res.json({ status: "error", error: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].hashed_password
    );
    if (!validPassword) {
      return res.json({ status: "error", error: "Invalid email or password" });
    }

    res.json({ status: "ok", user: user.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
});

// FORGOT PASSWORD

// SETUP FOR MAILING OTP

const otpValidStore = new Map();

const sender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/forgotPassword", async (req, res) => {
  const { email } = req.body;

  if (!email || email.charAt(0) === " ") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now

  otpValidStore.set(email, { otp, expirationTime });

  try {
    const user = await client.query(
      "SELECT * FROM users_data WHERE email = $1",
      [email]
    );
    if (user.rows.length === 0) {
      return res.json({ status: "error", error: "Email not found" });
    }

    // Code for sending email to the user for password change

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for Password Reset",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    };

    sender.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("failed");
        return res.status(500).send("Error sending email");
      }
      console.log("Email sent:", info.response);
      res.status(200).send("OTP sent successfully");
    });

    console.log("Password reset email sent to:", email);
    res.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
});

// SETTING NEW PASSWORD

app.post("/newPassword", async (req, res) => {
  const { otp, email, newpassword } = req.body.otpData;
  console.log(otp);
  console.log(email);
  console.log(newpassword);

  const storedData = otpValidStore.get(email);
  if (!storedData) {
    return res.status(400).send("Invalid Email or OTP");
  }

  const { otp: storedOtp, expirationTime } = storedData;
  if (Date.now() > expirationTime) {
    otpValidStore.delete(email);
    alert("OTP expired");
    return res.status(400).send("OTP expired");
  }

  if (storedOtp !== otp) {
    alert("Incorrect OTP");
    return res.status(400).send("Incorrect OTP");
  }

  if (!newpassword || typeof newpassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  const newhashedPassword = await bcrypt.hash(newpassword, 10);
  console.log(newhashedPassword);

  try {
    await client.query(
      "UPDATE users_data SET hashed_password = $1 WHERE email = $2",
      [newhashedPassword, email]
    );
    otpValidStore.delete(email); // Remove OTP after successful password reset
    res.json({ status: "ok" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
});

// MANAGING POST

app.use("/postApi", postRoute);

// MANAGING PROFILE
app.use("/profileApi",profileRoute)

// MANAGING COMMENT
app.use("/commentApi", commentRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on localhost:", PORT);
});
