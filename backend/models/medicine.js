const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
  name: { type: String, required: true },
  needID: { type: Boolean, required: true },
});

module.exports = mongoose.model("Medicine", medicineSchema);
