const express = require("express");
const MedicineController = require("../controllers/medicine");

const router = express.Router();

router.get("", MedicineController.getMedicines);

module.exports = router;
