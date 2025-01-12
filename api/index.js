const express = require("express");
const { readFileSync } = require("fs");
const path = require("path");
const app = express.Router();
const translate = require("translate-google");
const ISO6391 = require("iso-639-1");

app.get("/api", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    message: "API-Service is running!",
  });
});

app.get("/api/quotes", (req, res) => {
  const data = JSON.parse(
    readFileSync(path.resolve("./assets", "quotes.json"), "utf-8")
  );
  const index = Math.floor(Math.random() * data.length);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(data[index]);
});

app.get("/api/chamngon", (req, res) => {
  const data = JSON.parse(
    readFileSync(path.resolve("./assets", "chamngon.json"), "utf-8")
  );
  const index = Math.floor(Math.random() * data.length);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(data[index]);
});

app.get("/api/thathinh", (req, res) => {
  const data = JSON.parse(
    readFileSync(path.resolve("./assets", "thathinh.json"), "utf-8")
  );
  const index = Math.floor(Math.random() * data.length);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(data[index]);
});

app.get("/api/translate/:lang/:text", async (req, res) => {
  const text = req.params.text;
  const lang = req.params.lang;
  translate(text, { to: lang })
    .then((results) => {
      const langName = ISO6391.getName(lang) || lang;
      res.statusCode = 200;
      res.send({
        text: text,
        lang: langName,
        result: results,
      });
    })
    .catch((error) => {
      res.statusCode = 500;
      res.send({
        error: error,
      });
    });
});

const quizData = JSON.parse(
  readFileSync(path.resolve("./assets", "question.json"), "utf-8")
);

const quizlv1Data = JSON.parse(
  readFileSync(path.resolve("./assets", "quizlv1.json"), "utf-8")
);

const quizlv2Data = JSON.parse(
  readFileSync(path.resolve("./assets", "quizlv2.json"), "utf-8")
);

const quizlv3Data = JSON.parse(
  readFileSync(path.resolve("./assets", "quizlv3.json"), "utf-8")
);

function getRandomItems(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

app.get("/api/quiz", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    quizlvl1: getRandomItems(quizlv1Data, 10),
    quizlvl2: getRandomItems(quizlv2Data, 10),
    quizlvl3: getRandomItems(quizlv3Data, 10),
  });
});

export default app;
