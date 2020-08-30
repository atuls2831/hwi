const express = require("express");
const PrescriptionController = require("../controllers/prescription");
const checkAuth = require("../middleware/check-auth");
const checkAdmin = require("../middleware/check-admin");
const extractFileMemory = require("../middleware/tempFile");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post(
  "",
  checkAuth,
  extractFile,
  PrescriptionController.createPrescription
);

router.get("", checkAuth, PrescriptionController.getPrescriptions);

router.get("/pending", checkAuth, PrescriptionController.getRefilPending);

router.get(
  "/unverified",
  checkAuth,
  checkAdmin,
  PrescriptionController.getVerificationPending
);

router.put("/verify/:id", checkAuth, checkAdmin, PrescriptionController.verify);

router.get(
  "/refill-pending",
  checkAuth,
  checkAdmin,
  PrescriptionController.getRefillPending
);

router.get(
  "/complete/:id",
  checkAuth,
  checkAdmin,
  PrescriptionController.deletePrescription
);

router.post(
  "/recognise/:id",
  checkAuth,
  extractFileMemory,
  PrescriptionController.requestRefil
);

module.exports = router;
