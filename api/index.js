const express = require("express");
const { readFileSync } = require("fs");
const path = require("path");
const app = express.Router();

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
  const data = JSON.parse(path.resolve("./assets", "thathinh.json"), "utf-8");
  const index = Math.floor(Math.random() * data.length);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(data[index]);
});

export default app;
