const admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.send("You are not allowed, see your system admin");
  }
  next();
};

module.exports = admin;
