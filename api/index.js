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

app.get("/api/quiz", (req, res) => {
  const randomIndex = Math.floor(Math.random() * quizData.length);
  const randomIndexlv1 = Math.floor(Math.random() * quizlv1Data.length);
  const randomIndexlv2 = Math.floor(Math.random() * quizlv2Data.length);
  const randomIndexlv3 = Math.floor(Math.random() * quizlv3Data.length);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    simplequiz: quizData[randomIndex],
    quizlvl1: quizlv1Data[randomIndexlv1],
    quizlvl2: quizlv2Data[randomIndexlv2],
    quizlvl3: quizlv3Data[randomIndexlv3],
  });
});

export default app;
