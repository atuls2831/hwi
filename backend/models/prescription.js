const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  medicines: [String],
  idCheck: { type: Boolean, required: true },
  verified: { type: Boolean, required: true },
  awaitingRefil: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  imageURL: { type: String }
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
