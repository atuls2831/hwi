module.exports = (req, res, next) => {
  if (req.userData.email !== "admin@admin") {
    return res.status(401).json({ message: "Only admin can access this" });
  }
  next();
};
