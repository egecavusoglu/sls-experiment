const uuid = require("uuid");
const express = require("express");
const app = express();

function generateUuid() {
  return uuid.v1();
}

app.get("/", async (req, res) => {
  res.status(200).json({
    isSuccess: true,
    data: {
      uuid: generateUuid(),
    },
  });
});

const serverless = require("serverless-http");
module.exports.handler = serverless(app);
