const Prescription = require("../models/prescription");
const Medicine = require("../models/medicine");
const User = require("../models/user");
const util = require("util");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const sendMail = require("../utils/nodemailer");

const rekognition = new AWS.Rekognition({ region: "ap-south-1" });
const readImage = util.promisify(fs.readFile);

exports.deletePrescription = async (req, res) => {
  const prescription = await Prescription.findById(
    req.params.id
  ).populate("userId", ["email"]);
  if (!prescription) {
    return res.status(400).json({ message: "operation failed" });
  }
  await prescription.remove();
  sendMail(
    prescription.userId.email,
    `Your prescription#${prescription._id} has been delivered`,
    "Thank you for using MyMeds"
  );
  res.status(200).json({
    message: "Prescription deleted",
  });
};

exports.createPrescription = async (req, res) => {
  const userId = req.userData.userId;
  const { medicines } = req.body;
  // determine wheather id check is required
  const medicinesRequireId = await Medicine.find({
    name: { $in: medicines },
    needID: true,
  });
  let requireIdCheck = false;
  let verified = true;

  if (medicinesRequireId.length > 0) {
    requireIdCheck = true;
    verified = false;
  }

  const prescription = new Prescription({
    userId: userId,
    medicines: medicines,
    idCheck: requireIdCheck,
    verified: verified,
    awaitingRefil: false,
  });

  await prescription.save();

  res.status(201).json({
    message: "Prescription added successfully",
    prescription: {
      ...prescription.toObject(),
    },
  });
};

exports.getPrescriptions = async (req, res) => {
  const userId = req.userData.userId;
  const prescriptions = await Prescription.find({ userId: userId });
  res.status(200).json({
    prescriptions: prescriptions,
  });
};

exports.getVerificationPending = async (req, res) => {
  const prescriptions = await Prescription.find({
    verified: false,
  }).populate("userId", ["email"]);
  res.status(200).json({
    prescriptions: prescriptions,
  });
};

exports.getRefillPending = async (req, res) => {
  const prescriptions = await Prescription.find({
    awaitingRefil: true,
  }).populate("userId", ["email"]);
  res.status(200).json({
    prescriptions: prescriptions,
  });
};

exports.getRefilPending = async (req, res) => {
  const userId = req.userData.userId;
  const prescriptions = await Prescription.find({
    awaitingRefil: true,
    userId: userId,
  });
  res.status(200).json({
    prescriptions: prescriptions,
  });
};

exports.verify = async (req, res) => {
  const prescription = await Prescription.findById(
    req.params.id
  ).populate("userId", ["email"]);
  if (!prescription) {
    return res.status(400).json({ message: "operation failed" });
  }
  prescription.verified = true;
  await prescription.save();
  sendMail(
    prescription.userId.email,
    `Your prescription#${prescription._id} has been verified`,
    "Please login to MyMeds for biometric verification"
  );
  res.status(200).json({
    message: "Prescription verified",
  });
};

exports.requestRefil = async (req, res) => {
  const user = await User.findById(req.userData.userId);
  const prescription = await Prescription.findById(req.params.id);

  if (!prescription.userId.equals(user._id)) {
    return res
      .status(404)
      .json({ message: "user has no prescription with given id" });
  } else if (prescription.awaitingRefil === true) {
    return res
      .status(400)
      .json({ message: "prescreption already awaiting refil" });
  } else if (!prescription.verified) {
    return res.status(400).json({ message: "prescreption not verified" });
  }

  if (!prescription.idCheck) {
    prescription.awaitingRefil = true;
    await prescription.save();
    return res.status(200).json({ message: "Refil requested!" });
  }

  const srcImage = req.file.buffer;
  console.log(user);
  console.log(prescription);

  const tarImage = await readImage(path.join(__dirname, "..", user.imageURL));
  const params = {
    SourceImage: { Bytes: srcImage },
    TargetImage: { Bytes: tarImage },
  };

  let result;

  try {
    result = await rekognition.compareFaces(params).promise();
  } catch {
    return res.status(400).json({ message: "Face not present in image!" });
  }

  if (result.FaceMatches.length === 0) {
    return res.status(400).json({ message: "Face doesn't match!" });
  }

  prescription.awaitingRefil = true;
  await prescription.save();
  return res.status(200).json({ message: "Refil requested!" });
};
