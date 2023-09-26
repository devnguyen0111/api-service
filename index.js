const express = require("express");

const app = express();

app.use(express.json());

app.use(express.static("public"));

if (process.platform == "win32") {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
