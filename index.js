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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Launched app in port ${PORT}`);
});
