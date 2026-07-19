const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send("Addidu's Portfolio CMS API is running...");
});

module.exports = app;