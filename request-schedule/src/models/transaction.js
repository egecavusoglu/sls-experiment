const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: { type: Date, default: Date.now },
  service: {
    type: String,
    enum: ["lambda", "traditional"],
  },
  execution_time_ms: {
    type: Number,
  },
  execution_result: {
    type: String,
    enum: ["success", "failure"],
  },
  response_uid: {
    type: String,
  },
});

const database = mongoose.connection.useDb("database");
module.exports = database.model("transactions", TransactionSchema);
