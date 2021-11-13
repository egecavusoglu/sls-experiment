"use strict";

module.exports.run = async (event, context) => {
  const time = new Date();
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);
};

async function logRequest() {
  const start = Date.now();

  try {
    //   const response = await
  } catch (err) {}

  const milisecondsElapsed = Date.now() - start;
}
