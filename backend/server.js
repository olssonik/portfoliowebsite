const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const financejson = require("./finance.json");
const blogposts = require("./posts.json");
require("dotenv").config();
const blogposts = require("./posts.json");

const app = express();
const port = 3000;

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/oliborozynski.ddns.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/oliborozynski.ddns.net/fullchain.pem'),
};
app.use(cors(), express.json(), express.static('public'));



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

  if (jwtdata == token) {
    if (postData) {
      const currentDate = new Date();
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/London",
      };
      const dateFormatter = new Intl.DateTimeFormat("en-GB", options);
      const formattedDate = dateFormatter.format(currentDate);

      let content = postData.content;
      let title = postData.title;

      const createEntry = (date, title, content) => {
        return {
          date: date,
          title: title,
          content: content,
        };
      };
      const entry = createEntry(formattedDate, title, content);

      const fs = require("fs");
      const filePath = "posts.json";

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
        } else {
          const existingPosts = JSON.parse(data);

          existingPosts.push(entry);

          const updatedJsonString = JSON.stringify(existingPosts, null, 2);

          fs.writeFile(filePath, updatedJsonString, (err) => {
            if (err) {
              console.error("Error writing to file:", err);
            }
          });
        }
      });

      res.json({ data: "net" });
    } else {
      res.status(400).json({ error: "Invalid request body" });
    }
  } else {
    console.log("wrong token");
  }
});

app.get("/api/blogposts", (req, res) => {
  res.json({ blogposts });
});


const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
