const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use(express.json());

app.use(express.static("public"));

const servlerlessHandler = serverless(app);

if (process.platform == "win32") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default servlerlessHandler;
