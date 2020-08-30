const Medicine = require("../models/medicine");

exports.getMedicines = async (req, res) => {
  let medicines = await Medicine.find();
  res.status(200).json(medicines);
};
