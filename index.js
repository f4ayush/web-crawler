const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const bodyParser = require("body-parser");
const scrape = require("./scrape");
const app = express();
let userName = "";
let path = "";

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));

app.post("/username", (req, res) => {
  userName = req.body.username;
  path = `https://github.com/${userName}?tab=repositories`;
  req.gitPath = path;
  res.sendFile(__dirname + "/public/main.html");
});

path = `https://github.com/f4ayush?tab=repositories`;
scrape
  .scrape(path)
  .then((html) => {
    const $ = cheerio.load(html);

    app.use(express.static("public"));

    app.get("/repo/title", (req, res) => {
      let title = [];
      $(".d-inline-block .mb-1> h3").each((i, repoTitle) => {
        title.push($(repoTitle).text().replace(/\s\s+/g, ""));
      });

      res.send(title);
    });
    app.get("/repo/tech-stack", (req, res) => {
      let techStack = [];
      $("span>span[itemprop]").each((i, repoStack) => {
        const stack = $(repoStack).text();
        techStack.push(stack);
      });
      res.send(techStack);
    });
    app.get("/repo/last-updated", (req, res) => {
      let updatedOn = [];
      $("relative-time").each((i, time) => {
        const updatedTime = $(time).text();
        updatedOn.push("Last updated on " + updatedTime);
      });
      res.send(updatedOn);
    });
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(3000);
