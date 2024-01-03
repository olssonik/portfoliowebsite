const express = require("express");
const app = express();
const cors = require("cors");
const financejson = require("./finance.json");
require("dotenv").config();

app.use(cors(), express.json());

function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=";
  let randomString = "";

  for (let i = 0; i < 100; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  console.log("new token: " + randomString);
  return randomString;
}
const token = generateRandomString();

app.post("/api/auth", function (req, res) {
  const postData = req.body;
  if (postData.pass == String(process.env.PASSWORD)) {
    if (postData) {
      res.json({ jwt: token });
    } else {
      res.status(400).json({ error: "Invalid request body" });
    }
  } else {
    console.log("wrong pass");
  }
});

app.post("/api/test", (req, res) => {
  const postData = req.body;
  let jwtdata = postData.token;

  if (jwtdata == token) {
    if (postData) {
      const randomInt = Math.floor(Math.random() * 10) + 1;
      res.json({ data: randomInt });
    } else {
      res.status(400).json({ error: "Invalid request body" });
    }
  } else {
    console.log("wrong token");
  }
});

app.post("/api/finance", (req, res) => {
  const postData = req.body;
  let jwtdata = postData.token;

  if (jwtdata == token) {
    if (postData) {
      res.json({ financejson });
    } else {
      res.status(400).json({ error: "Invalid request body" });
    }
  } else {
    console.log("wrong token");
  }
});

let comments = [];

app.post("/api/comments", function (req, res) {
  const postData = req.body;
  let jwtdata = postData.token;

  if (jwtdata == token) {
    if (postData) {
      comments.push(postData.comment);
      res.json({ comments });
    } else {
      res.status(400).json({ error: "Invalid request body" });
    }
  } else {
    console.log("wrong token");
  }
});

app.post("/api/blogpost", (req, res) => {
  const postData = req.body;

  let jwtdata = postData.token;

  console.log(postData);
  if (jwtdata == token) {
    if (postData) {
      let content = postData.content;

      const entryTemplate = (date, title, content) => {
        return {
          date: date,
          title: title,
          content: content,
        };
      };

      res.json({ blogFile });
    } else {
      res.status(400).json({ error: "Invalid request body" });
    }
  } else {
    console.log("wrong token");
  }
});

app.listen(3333);
