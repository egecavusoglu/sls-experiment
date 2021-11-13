"use strict";
const fetch = require("cross-fetch");

module.exports.run = async (event, context) => {
  for (let i = 0; i < 1; i++) {
    // Send request to traditional servers
    await sendRequest("traditional");
    // Send request to lambda function
    await sendRequest("lambda");
  }
};

const LAMBDA_URI =
  "https://wz7bwprmgk.execute-api.us-east-1.amazonaws.com/dev/";
const TRADITIONAL_URI = "http://54.167.39.146:8082/";

async function sendRequest(service) {
  const start = Date.now();
  const serviceUri = service == "lambda" ? LAMBDA_URI : TRADITIONAL_URI;
  try {
    let response = await fetch(serviceUri);
    response = await response.json();
    const milisecondsElapsed = Date.now() - start;
    console.log("RESPONSE", service, response);
    await saveTransaction({
      service,
      executionTime: milisecondsElapsed,
      executionResult: "success",
      responseUid: response.data.uuid,
    });
  } catch (err) {
    console.log(`Error sending request to ${service}`, err);
    const milisecondsElapsed = Date.now() - start;
    await saveTransaction({
      service,
      executionTime: milisecondsElapsed,
      executionResult: "failure",
      responseUid: "no_id",
    });
  }
}

const TransactionModel = require("./src/models/transaction");
const { connectToDb } = require("./src/mongoose");
const mongoose = require("mongoose");
async function saveTransaction({
  service, // "lambda" or "traditional"
  executionTime,
  executionResult, // "success" or "fail"
  responseUid,
}) {
  try {
    await connectToDb();
    await new TransactionModel({
      _id: new mongoose.Types.ObjectId(),
      service: service,
      execution_time_ms: executionTime,
      execution_result: executionResult,
      response_uid: responseUid,
    }).save();
  } catch (err) {
    console.log("Error saving trx to DB.", err);
  }
}
