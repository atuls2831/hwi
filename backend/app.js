const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const medicineRoutes = require("./routes/medicine");
const presciptionRoutes = require("./routes/prescription");

const app = express();

mongoose
  .connect(
    `mongodb+srv://root:${process.env.MONGO_ATLAS_PASSWORD}@hwi.i55ns.mongodb.net/hwi20?retryWrites=true&w=majority`,
    // added due to deprication warning
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log(error);
  });

// for parsing json data, body is stream of bits initially
app.use(bodyParser.json());
// not used here, but you can parse urlencoded data too
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // for CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  // for allowed methods
  // OPTIONS is set implicitely by angular to check if
  // post request is valid
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/prescription", presciptionRoutes);

module.exports = app;
